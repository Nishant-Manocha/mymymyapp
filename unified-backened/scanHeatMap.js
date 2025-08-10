const mongoose = require("mongoose");
const axios = require("axios");

// ✅ MongoDB connection
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/scanHeatMapDB";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Schema & Safe Model Definition (Prevents OverwriteModelError)
const reportSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  contactInfo: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String },
  latitude: Number,
  longitude: Number,
  createdAt: { type: Date, default: Date.now },
});

const Report =
  mongoose.models.Report || mongoose.model("Report", reportSchema);

// ✅ Reverse Geocode Helper
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
async function getReadableAddress(lat, lng) {
  try {
    const res = await axios.get(
      `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
    );
    if (res.data.results.length > 0) {
      const formatted = res.data.results[0].formatted_address;
      const cityComponent = res.data.results[0].address_components.find((c) =>
        c.types.includes("locality")
      );
      return {
        address: formatted,
        city: cityComponent ? cityComponent.long_name : "",
      };
    }
  } catch (error) {
    console.error("Reverse geocode failed:", error.message);
  }
  return { address: "Unknown Location", city: "" };
}

// ✅ Middleware to ensure address
async function ensureAddress(req, res, next) {
  if (!req.body.address && req.body.latitude && req.body.longitude) {
    const { address, city } = await getReadableAddress(
      req.body.latitude,
      req.body.longitude
    );
    req.body.address = address;
    req.body.city = city;
  }
  next();
}

// ✅ Exported router function
module.exports = function (app) {
  // POST: Create report
  app.post("/api/reports", ensureAddress, async (req, res) => {
    try {
      const report = new Report(req.body);
      await report.save();
      res.status(201).json(report);
    } catch (error) {
      res.status(500).json({ message: "Error saving report", error });
    }
  });

  // GET: All reports
  app.get("/api/reports", async (req, res) => {
    try {
      const reports = await Report.find().sort({ createdAt: -1 });

      // Fix legacy entries without address
      for (const r of reports) {
        if (!r.address && r.latitude && r.longitude) {
          const { address, city } = await getReadableAddress(
            r.latitude,
            r.longitude
          );
          r.address = address;
          r.city = city;
          await r.save();
        }
      }

      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reports", error });
    }
  });

  // GET: Report by ID
  app.get("/api/reports/:id", async (req, res) => {
    try {
      const report = await Report.findById(req.params.id);
      if (!report) return res.status(404).json({ message: "Report not found" });
      res.json(report);
    } catch (error) {
      res.status(500).json({ message: "Error fetching report", error });
    }
  });

  // DELETE: Report by ID
  app.delete("/api/reports/:id", async (req, res) => {
    try {
      await Report.findByIdAndDelete(req.params.id);
      res.json({ message: "Report deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting report", error });
    }
  });
};

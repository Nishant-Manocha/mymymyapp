const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
require("./docHashRoutes")(app);
require("./phishingRoutes")(app);
require("./nearestCyberCell")(app);
require("./course_GoalRoutes")(app);
require("./scanHeatMap")(app);
const authRoutes = require("./authRoutes");

app.use('/api/auth', authRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

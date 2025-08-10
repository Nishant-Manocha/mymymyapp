const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { decryptWithSharedSecret, encryptWithSharedSecret } = require('./utils/crypto');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.text({ type: ['text/plain', 'text/*'], limit: '2mb' }));
app.use(express.json());

// Transport encryption middleware (optional)
app.use((req, res, next) => {
  try {
    const sharedSecret = process.env.API_SHARED_SECRET;
    const isEncrypted = req.headers['x-encrypted'] === '1';
    const iv = req.headers['x-iv'];

    if (sharedSecret && isEncrypted && typeof req.body === 'string') {
      const decrypted = decryptWithSharedSecret(req.body, sharedSecret, iv);
      try {
        req.body = JSON.parse(decrypted);
      } catch {
        req.body = decrypted;
      }
    }
  } catch (e) {
    console.error('Transport decryption failed:', e.message);
    return res.status(400).json({ success: false, message: 'Invalid encrypted payload' });
  }

  // Wrap res.json to optionally encrypt responses
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    const sharedSecret = process.env.API_SHARED_SECRET;
    if (sharedSecret && req.headers['x-encrypted'] === '1') {
      const plaintext = JSON.stringify(data);
      const { payload, ivBase64 } = encryptWithSharedSecret(plaintext, sharedSecret);
      res.setHeader('X-Encrypted', '1');
      res.setHeader('X-IV', ivBase64);
      res.setHeader('Content-Type', 'text/plain');
      return res.send(payload);
    }
    return originalJson(data);
  };

  next();
});

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

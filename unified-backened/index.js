const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { decryptWithSharedSecret, encryptWithSharedSecret } = require('./utils/crypto');

const app = express();
const PORT = process.env.PORT || 4000;

// CORS (expose encryption headers for clients that need to read them)
app.use(cors({
  exposedHeaders: ['X-Encrypted', 'X-IV'],
}));

// Parsers: text first for encrypted payloads, then JSON for normal requests
app.use(express.text({ type: ['text/plain', 'text/*'], limit: '2mb' }));
app.use(express.json());

// Transport encryption middleware (optional)
app.use((req, res, next) => {
  console.log('[SERVER RX]', {
    reqId: req.headers['x-request-id'],
    enc: req.headers['x-encrypted'],
    ctype: req.headers['content-type'],
    bodyType: typeof req.body,
    bodySample: typeof req.body === 'string' ? req.body.slice(0, 120) : undefined
  });

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
      console.log('[SERVER RX decrypted]', {
        reqId: req.headers['x-request-id'],
        bodyType: typeof req.body,
        keys: req.body && typeof req.body === 'object' ? Object.keys(req.body) : undefined
      });
    }
  } catch (e) {
    console.error('[SERVER DEC] failed', {
      reqId: req.headers['x-request-id'],
      msg: e.message,
      hasIV: !!req.headers['x-iv']
    });
    return res.status(400).json({ success: false, message: 'Invalid encrypted payload' });
  }

  // Wrap res.json to optionally encrypt responses
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    const sharedSecret = process.env.API_SHARED_SECRET;
    if (sharedSecret && req.headers['x-encrypted'] === '1') {
      try {
        const plaintext = JSON.stringify(data);
        const { payload, ivBase64 } = encryptWithSharedSecret(plaintext, sharedSecret);
        res.setHeader('X-Encrypted', '1');
        res.setHeader('X-IV', ivBase64);
        res.setHeader('Content-Type', 'text/plain');

        console.log('[SERVER TX]', {
          reqId: req.headers['x-request-id'],
          enc: 1,
          ivLen: ivBase64.length,
          ctSample: payload.slice(0, 120)
        });

        return res.send(payload);
      } catch (e) {
        console.error('[SERVER ENC] failed', { reqId: req.headers['x-request-id'], msg: e.message });
        return res.status(500).json({ success: false, message: 'Encryption failed' });
      }
    }

    console.log('[SERVER TX]', { reqId: req.headers['x-request-id'], enc: 0 });
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

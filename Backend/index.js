const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const client = require('prom-client');

dotenv.config();

const { connectDB } = require('./config/db.js');
const AdhanRoutes = require('./routes/adhan.route.js');
const QuranRoutes = require('./routes/quran.route.js');
const authRoutes = require("./routes/auth.route.js");
const userRoutes = require("./routes/user.route.js");

const app = express();
const PORT = process.env.PORT || 8090;
const FRONT_URL = process.env.FRONT_URL;

// === MongoDB connection (connect once at startup) ===
connectDB().catch(err => {
  console.error("MongoDB connection failed ❌", err);
  process.exit(1); // إيقاف السيرفر لو فشل الاتصال
});

// === Middleware ===
const corsOptions = {
  origin: FRONT_URL,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// === Prometheus Metrics ===
client.collectDefaultMetrics();

const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"]
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();

  res.on("finish", () => {
    const route = req.route ? req.route.path : req.path;

    httpRequestsTotal.inc({
      method: req.method,
      route: route,
      status: res.statusCode
    });

    end({ method: req.method, route: route, status: res.statusCode });
  });

  next();
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// === Routes ===
app.use('/AdhanTime', AdhanRoutes);
app.use('/Quran', QuranRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Hello to the Express server!');
  console.log('Hello to the Express server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
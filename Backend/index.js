const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const AdhanRoutes = require('./routes/adhan.route.js');
const QuranRoutes = require('./routes/quran.route.js');
const authRoutes = require("./routes/auth.route.js");
const userRoutes = require("./routes/user.route.js");

const client = require("prom-client");

require('dotenv').config();

const PORT = process.env.PORT || 8090;
const FRONT_URL = process.env.FRONT_URL;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected ✅"))
    .catch(err => console.log("MongoDB connection error ❌", err));

const corsOptions = {
    origin: FRONT_URL,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ===============================
   PROMETHEUS METRICS CONFIG
================================ */

// collect default node metrics (CPU, RAM, event loop...)
client.collectDefaultMetrics();

// counter for total requests
const httpRequestsTotal = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status"]
});

// histogram for response time
const httpRequestDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status"],
    buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});

// middleware to measure requests
app.use((req, res, next) => {

    const end = httpRequestDuration.startTimer();

    res.on("finish", () => {

        const route = req.route ? req.route.path : req.path;

        httpRequestsTotal.inc({
            method: req.method,
            route: route,
            status: res.statusCode
        });

        end({
            method: req.method,
            route: route,
            status: res.statusCode
        });

    });

    next();
});

// metrics endpoint for Prometheus
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

/* ===============================
   REST OF THE CODE
================================ */

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
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const { default: connectDB } = require("../config/db");

const router = require('../routes/actions');
const serverless = require("serverless-http");


const app = express();
app.use(cors(
  {
    origin : process.env.FRONTEND_URL,
    credentials : true
}));

app.use(express.json());

app.use(cookieParser());

let dbConnected = false;

app.use(async (req, res, next) => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (err) {
      console.error("MongoDB connection failed:", err);
      return res.status(500).send("Database connection failed");
    }
  }
  next();
});

app.use("/api", router);


module.exports = serverless(app);
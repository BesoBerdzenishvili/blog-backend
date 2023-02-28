require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World Blog!");
});

// Listen
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

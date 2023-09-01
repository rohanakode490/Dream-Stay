const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()
const app = express();

// middleware
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// database
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("Testing");
});

// creating new user 
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  

  res.json({ name, email, password });
});

app.listen(4000);

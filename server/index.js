const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const app = express();

const bcrypt_salt = bcrypt.genSaltSync(12);

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
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt_salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

// loggin the user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    // check the password typed by user and the encrypted in the DB
    const correctPassword = bcrypt.compareSync(password, userDoc.password);
    if (correctPassword) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        process.env.JWT_SECRET,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json("Pass ok");
        }
      );
    } else {
      res.status(422).json("Wrong Pass");
    }
  } else {
    res.json("Not Found");
  }
});

app.listen(4000);

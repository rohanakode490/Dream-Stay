const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// importing models
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");

const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs"); //files system to rename the file used in "image upload from device" section

const app = express();

const bcrypt_salt = bcrypt.genSaltSync(12);

// middleware
app.use(express.json());
app.use(cookieParser());

// upload image through link
app.use("/uploads", express.static(__dirname + "/uploads"));
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

// Function for Getting Token
function getUserDataFromRequest(req) {
  return new Promise((resolve, reject) => {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET,
        {},
        async (err, userData) => {
          if (err) throw err;
          resolve(userData);
        }
      );
    } else {
      res.json(null);
    }
  });
}

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

// login the user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    // check the password typed by user and the encrypted in the DB
    const correctPassword = bcrypt.compareSync(password, userDoc.password);
    if (correctPassword) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        process.env.JWT_SECRET,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("Wrong Pass");
    }
  } else {
    res.json("Not Found");
  }
});

// profile endpoint
app.get("/profile", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  const { name, email, _id } = await User.findById(userData.id);
  res.json({ name, email, _id });
});

// logout endpoint
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// image upload link
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = Date.now() + ".jpg"; //new name for the image
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

// image upload from device
const photoMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
  //photoMiddleware.array('photos', 100) => max number of photos =100
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const [name, extension] = originalname.split(".");
    const newPath = path + "." + extension;
    fs.renameSync(path, newPath);

    //newPath was like "uploads\\{filename}" just removing the "uploads\\" part
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

// add the place to the database
app.post("/places", async (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  const userData = await getUserDataFromRequest(req);
  const placeDoc = await Place.create({
    owner: userData.id,
    title: title,
    address: address,
    photos: addedPhotos,
    description: description,
    perks: perks,
    extraInfo: extraInfo,
    checkIn: checkIn,
    checkOut: checkOut,
    maxGuests: maxGuests,
    price: price,
  });

  res.json(placeDoc);
});

// get all the places to display
app.get("/user-places", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  const { id } = userData;
  res.json(await Place.find({ owner: id }));
});

// Sending information to PlacePage.jsx to display all the data of the particular page
app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

// update the data
app.put("/places/", async (req, res) => {
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  const userData = await getUserDataFromRequest(req);

  const placeDoc = await Place.findById(id);
  if (userData.id === placeDoc.owner.toString()) {
    //                    ^
    //                    |
    //'placeDoc.owner' => is a object data type and 'userData.id' is string datatype
    placeDoc.set({
      title: title,
      address: address,
      photos: addedPhotos,
      description: description,
      perks: perks,
      extraInfo: extraInfo,
      checkIn: checkIn,
      checkOut: checkOut,
      maxGuests: maxGuests,
      price: price,
    });
    await placeDoc.save();
    res.json("ok");
  }
});

//display all the places on the main page
app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

// booking from BookingWidget.jsx
app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromRequest(req);

  const { checkIn, checkOut, numberOfGuests, name, phone, place, price } =
    req.body;

  Booking.create({
    place,
    user: userData.id,
    checkIn,
    checkOut,
    name,
    phone,
    numberOfGuests,
    price,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

// BookingsPage - to list all the bookings one user has done
app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  const send = await Booking.find({ user: userData.id }).populate('place');
  res.json(send);
});

app.listen(4000);

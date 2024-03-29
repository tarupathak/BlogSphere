const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Import mongoose
const User = require("./models/User");
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://pathaktaru2002:12345@cluster0.yb85zcz.mongodb.net/BlogSphere",
  
);

const salt = bcrypt.genSaltSync(10);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.post('/register', async (req,res) => {
  const {username,password} = req.body;
  try{
    const userDoc = await User.create({
      username,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

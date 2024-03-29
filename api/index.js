const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Import mongoose
const User = require("./models/User");
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://pathaktaru2002:12345@cluster0.yb85zcz.mongodb.net/BlogSphere",
  
);

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';


const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.post('/register', async (req,res) => {
  const {username,password} = req.body;
  try{
    const users = await User.create({
      username,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(users);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/login', async (req,res) => {
  const {username,password} = req.body;
  const users = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, users.password);
  if (passOk) {
    jwt.sign({username,id:users._id}, secret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id:users._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

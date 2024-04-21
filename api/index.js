const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Import mongoose
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use;

mongoose.connect(
  "mongodb+srv://pathaktaru2002:12345@cluster0.yb85zcz.mongodb.net/BlogSphere"
);

const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj";

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const users = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, users.password);
  if (passOk) {
    jwt.sign({ username, id: users._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: users._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
  res.json(req.cookies);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const { token } = req.cookies;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      author: info.id,
      cover: newPath,
    });
    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  res.json(await Post.find().populate("author", ["username"]));
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

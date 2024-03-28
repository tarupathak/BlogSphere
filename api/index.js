const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Import mongoose
const User = require("./models/User");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://pathaktaru2002:12345@cluster0.yb85zcz.mongodb.net/BlogSphere",
  
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.create({
      username,
      password
    });
    res.json(userDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 3001");
});

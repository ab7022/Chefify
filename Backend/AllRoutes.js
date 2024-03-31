const express = require("express");
const { User } = require("./database");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require('./config')
const { authMiddleware } = require("./middleware");
router.use(express.json());

router.post("/signup", async function signup(req, res) {
  try {
    const { name, username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        msg: "User already exists",
      });
    }
    const newUser = new User({
      name,
      username,
      password,
    });
    await newUser.save();
    const userId = newUser._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.status(201).json({
      msg: "Account created successfully",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/signin", async function signin(req, res) {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({
        msg: "User does not exist",
      });
    }
    if (existingUser.password !== password) {
      return res.status(401).json({
        msg: "Incorrect password",
      });
    }
    const userId = existingUser._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({
      msg: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/profile", authMiddleware, async function profile(req, res) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    res.json({
      name: user.name,
      username: user.username,
      likes:user.likes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
router.post("/like", async function (req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
    console.log(token);
    const decodedToken = jwt.verify(token, JWT_SECRET); // Verify and decode the JWT token
    const userId = decodedToken.userId;
    const  recipeId  = req.body.recipeId;
    const  recipeName  = req.body.recipeName;

    const like = {
      recipeId: recipeId,
      recipeName: recipeName
    };
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (!user.likes.includes(recipeId)) {
      user.likes.push(like);
      await user.save();
    }

    res.status(200).json({ msg: "Recipe liked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});


router.get("/like", async function (req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
    const decodedToken = jwt.verify(token, JWT_SECRET); // Verify and decode the JWT token
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log("likes:",user.likes);
    res.json(user.likes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
module.exports = router;

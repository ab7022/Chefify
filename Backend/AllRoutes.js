const express = require("express");
const { User } = require("./database");
const router = express.Router();

router.post("/signup", async function signup(req, res) {
  const { name, username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.json({
      msg: "user already exists",
    });
  }
  const newUser = new User({
    name,
    username,
    password,
  });

  newUser.save().then(() => {
    console.log("user saved successfully");
  });
  res.json({
    msg: "Login successful",

  });
});
router.post("/signin", async function signin(req, res) {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
  
    if (existingUser) {
      if (existingUser.password == password) {
        return res.json({
          msg: "Login successful",
     
        });
      } else {
        return res.json({
          msg: "Wrong password",
        });
      }
    } else {
      res.json({
        msg: "Please create a new account",
      });
    }
  });
  

module.exports = router;

const express = require("express");
const { User } = require("./database");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");
// const { authMiddleware } = require("./middleware");
router.use(express.json());
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const { GoogleGenerativeAI,HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");

// app.use(express.json());
// app.use(cors());

dotenv.config();
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

router.get("/profile", async function profile(req, res) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    res.json({
      name: user.name,
      username: user.username,
      likes: user.likes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
router.post("/like", async function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header
    console.log(token);
    const decodedToken = jwt.verify(token, JWT_SECRET); // Verify and decode the JWT token
    const userId = decodedToken.userId;
    const recipeId = req.body.recipeId;
    const recipeName = req.body.recipeName;

    const like = {
      recipeId: recipeId,
      recipeName: recipeName,
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
    const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header
    const decodedToken = jwt.verify(token, JWT_SECRET); // Verify and decode the JWT token
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log("likes:", user.likes);
    res.json(user.likes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Set up rate limiting middleware
const limiter = rateLimit({
  windowMs: 5 * 1000,
  max: 1,
  message: "Too many requests from this IP, please try again after 5 seconds.",
});

// app.use(limiter);



const apiKey = "AIzaSyCv9HBe7-xmQ7aU4Xr5AcWGo3catmN5Sus";
const genAI = new GoogleGenerativeAI(apiKey);


router.get("/", function (req, res) {
  res.json({
    msg: "It is working perfectly fine",
  });
});

// app.post("/saveUserID", (req, res) => {
//   const { userID } = req.body;
//   console.log("Received userID:", userID);
//   res.json({ message: "UserID received successfully" });
// });

router.post("/AiSearch", async function (req, res) {
  try {
    console.log("Loading...");
    
    const prompt = req.body.prompt;

    if (prompt) {
      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ];
      const model = genAI.getGenerativeModel({ model: "gemini-pro" },safetySettings);

      const result = await model.generateContentStream(prompt);

      // Set response headers for streaming
      res.writeHead(200, {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      });

      // Stream chunks of data to the client
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        res.write(chunkText);
      }

      // End the response stream
      res.end();
    } else {
      // No text provided
      res.status(400).json({ error: "Invalid request. Please provide text." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;

const mongoose = require("mongoose");
const z = require("zod");
mongoose
 .connect(
    "mongodb+srv://abdul:srbAUEBouAvsp9HY@cluster0.argigth.mongodb.net/Foodiee",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

 .then(() => {
    console.log("database connected successfully");
  })
 .catch((err) => console.log("error connecting", err));
  const recipeSchema = new mongoose.Schema({
    userId:{
      type: mongoose.Schema.Types.ObjectId, // Assuming userId is an ObjectId

      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    ingredients: {
      type: String,
      required: [true, "ingredients is required"],
    },
    directions: {
      type: String,
      required: [true, "directions is required"],
    },
  });
  const commentSchema = new mongoose.Schema({
    userId:{
      type: mongoose.Schema.Types.ObjectId, // Assuming userId is an ObjectId

      required: true,
    },
    recipeId:{
      type: mongoose.Schema.Types.ObjectId, // Assuming userId is an ObjectId

      required: true,
    },
    comment: {
      type: String,
      required: [true, "comment is required"],
    },
  })
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  likes:{
    type: Array,
    default: []
  },
  favorites:{
    type: Array,
    default: []
  }
});

const User = mongoose.model("User", userSchema);
const Recipe = mongoose.model("Recipe", recipeSchema);
const comment = mongoose.model("Comment", commentSchema);
module.exports = {
  User: User,
  Recipe: Recipe,
  comment: comment
};
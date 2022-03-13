const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// Pour se connecter

router.put("/:id", async (req, response) => {
  if (req.body.userId == req.params.id) {
    // if (req.body.password) {
    //   const salt = await bcrypt.genSalt(10);
    //   req.body.password = await bcrypt.hash(req.body.password, salt);
    // }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      response.status(200).json(updateUser);
    } catch (error) {
      response.status(500).json(error);
    }
  } else {
    response.status(401).json("Yon can update only your account");
  }
});

// Delete

router.delete("/:id", async (req, response) => {
  if (req.body.userId == req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        response.status(200).json("User has been delete");
      } catch (error) {
        response.status(500).json(error);
      }
    } catch (error) {
      response.status(404).json("User not found ....");
    }
  } else {
    response.status(401).json("Yon can delete only your account");
  }
});

// Get user

router.get("/:id", async (req, response) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    response.status(200).json(others);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;

const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Pour se connecter

router.post("/register", async (req, response) => {
  try {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPasse = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const user = await newUser.save();
    response.status(200).json(user);
  } catch (error) {
    response.status(500).json(error);
  }
});

// login
router.post("/login", async (req, response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return response
        .status(404)
        .json("User not found désolé ce user n'exite pas");
    }

    // !user && response.status(400).json("Wrong credentials");
    // const validated = bcrypt.compare(req.body.password, user.password);

    // !validated && response.status(400).json("Wrong credentials");

    const { password, ...others } = user._doc;
    response.status(200).json(others);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;

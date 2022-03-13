const router = require("express").Router();
const Category = require("../models/Category");

// create a category
router.post("/", async (req, response) => {
  const newCat = new Category(req.body);
  try {
    const savedcat = await newCat.save();
    response.status(200).json(savedcat);
  } catch (error) {
    response.status(500).json(error);
  }
});

router.get("/", async (req, response) => {
  try {
    const cats = await Category.find();
    response.status(200).json(cats);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;

const router = require("express").Router();
const Post = require("../models/Post");

// CREATE POST
router.post("/", async (req, response) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    response.status(200).json(savedPost);
  } catch (error) {
    response.status(500).json(error);
  }
});

// update post

router.put("/:id", async (req, response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        response.status(200).json(updatePost);
      } catch (error) {
        response.status(500).json(error);
      }
    } else {
      req.status(401).json("You can update only your post ");
    }
  } catch (error) {
    response.status(500).json(error);
  }
});
// Delete Post
router.delete("/:id", async (req, response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        response.status(200).json("Post has been deleted ...");
      } catch (error) {
        response.status(500).json(error);
      }
    } else {
      req.status(401).json("You can delete only your post ");
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

// Get Post

router.get("/:id", async (req, response) => {
  try {
    const post = await Post.findById(req.params.id);
    response.status(200).json(post);
  } catch (error) {
    response.status(500).json(error);
  }
});

// Get all post
router.get("/", async (req, response) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;

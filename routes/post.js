const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");
  res.send(post);
});

router.post("/", async (req, res) => {
  let post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });
  post = await post.save();
  res.send(post);
});

router.put("/:id", async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    },
    { new: true }
  );
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");
  res.send(post);
});

router.delete("/:id", async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.id);
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");
  res.send(post);
});

module.exports = router;

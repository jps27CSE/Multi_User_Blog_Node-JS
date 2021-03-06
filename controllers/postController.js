const { validationResult } = require("express-validator");
const Flash = require("../utils/Flash");
const errorFormatter = require("../utils/validationErrorFormatter");
const readingTime = require("reading-time");
const Post = require("../models/Post");
const Porfile = require("../models/Profile");

exports.createPostGetController = (req, res, next) => {
  res.render("pages/dashboard/post/createPost", {
    title: "Create A New Post",
    error: {},
    flashMessage: Flash.getMessage(req),
    value: {},
  });
};

exports.createPostPostController = async (req, res, next) => {
  let { title, body, tags } = req.body;

  let errors = validationResult(req).formatWith(errorFormatter);
  console.log(errors);

  if (!errors.isEmpty()) {
    res.render("pages/dashboard/post/createPost", {
      title: "Create A New Post",
      error: errors.mapped(),
      flashMessage: Flash.getMessage(req),
      value: { title, body, tags },
    });
  }

  if (tags) {
    tags = tags.split(",");
  }

  let readTime = readingTime(body).text;

  let post = new Post({
    title,
    body,
    tags,
    author: req.user._id,
    thumbnail: "",
    readTime,
    likes: [],
    dislikes: [],
    comments: [],
  });

  if (req.file) {
    post.thumbnail = `/uploads/${req.file.filename}`;
  }
  // prettier-ignore
  try {
    let createdPost = await post.save();

    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $push: { "posts": createdPost._id } }
    );
    return res.redirect(`/posts/edit/${createdPost._id}`);
  } catch (e) {
    next(e);
  }
};

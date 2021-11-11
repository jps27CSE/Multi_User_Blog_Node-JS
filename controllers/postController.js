const { validationResult } = require("express-validator");
const Flash = require("../utils/Flash");
const errorFormatter = require("../utils/validationErrorFormatter");

exports.createPostGetController = (req, res, next) => {
  res.render("pages/dashboard/post/createPost", {
    title: "Create A New Post",
    error: {},
    flashMessage: Flash.getMessage(req),
    value: {},
  });
};

exports.createPostPostController = (req, res, next) => {
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

  res.render("pages/dashboard/post/createPost", {
    title: "Create A New Post",
    error: {},
    flashMessage: Flash.getMessage(req),
    value: {},
  });
};

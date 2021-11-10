const Flash = require("../utils/Flash");

const { validationResult } = require("express-validator");
const Flash = require("../utils/Flash");
const errorFormatter = require("../utils/validationErrorFormatter");

exports.createPostGetController = (req, res, next) => {
  res.render("pages/dashboard/post/createPost", {
    title: "Create A New Post",
    error: {},
    flashMessage: Flash.getMessage(req),
  });
};

exports.createPostPostController = (req, res, next) => {
  let errors = validationResult(req).formatWith(errorFormatter);
  console.log(errors);

  res.render("pages/dashboard/post/createPost", {
    title: "Create A New Post",
    error: {},
    flashMessage: Flash.getMessage(req),
  });
};

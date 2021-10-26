const User = require("../models/User");

exports.signupGetController = (req, res, next) => {
  res.render("pages/auth/signup", { title: "Create A New Account" });
};
exports.signupPostController = async (req, res, next) => {
  let { username, email, password } = req.body;

  let user = new User({
    username,
    email,
    password,
  });

  try {
    let createdUser = await user.save();
    console.log("User Created Successfully", createdUser);
    res.render("pages/auth/signup", { title: "Create A New Account" });
  } catch (e) {
    console.log(e);
    next(e);
  }

  res.render("pages/auth/signup", { title: "Create A New Account" });
};
exports.loginGetController = (req, res, next) => {};
exports.loginPostController = (req, res, next) => {};
exports.logoutController = (req, res, next) => {};

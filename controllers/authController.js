const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signupGetController = (req, res, next) => {
  res.render("pages/auth/signup", { title: "Create A New Account" });
};
exports.signupPostController = async (req, res, next) => {
  let { username, email, password } = req.body;

  try {
    let hashedPassword = await bcrypt.hash(password, 11);

    let user = new User({
      username,
      email,
      password: hashedPassword,
    });

    let createdUser = await user.save();
    console.log("User Created Successfully", createdUser);
    res.render("pages/auth/signup", { title: "Create A New Account" });
  } catch (e) {
    console.log(e);
    next(e);
  }

  res.render("pages/auth/signup", { title: "Create A New Account" });
};
exports.loginGetController = (req, res, next) => {
  res.render("pages/auth/login", { title: "Login To Your Account" });
};
exports.loginPostController = async (req, res, next) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "invalid" });
    }

    let match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ message: "invalid" });
    }

    console.log("Successfully Logged In", user);

    res.render("pages/auth/login", { title: "Login To Your Account" });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
exports.logoutController = (req, res, next) => {};

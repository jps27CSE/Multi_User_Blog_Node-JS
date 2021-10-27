const router = require("express").Router();
const { body } = require("express-validator");
const User = require("../models/User");
const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutController,
} = require("../controllers/authController");

const signupValidator = [
  body("username")
    .isLength({ min: 2, max: 15 })
    .withMessage("Username Must be Between 2 to 15 characters")
    .custom(async (username) => {
      let user = await User.findOne({ username });
      if (user) {
        return Promise.reject("Username Already Used");
      }
    })
    .trim(),
  body("email")
    .isEmail()
    .withMessage("Please Provide a Valid Email")
    .custom(async (email) => {
      let user = await User.findOne({ email });
      if (user) {
        return Promise.reject("Email Already Used");
      }
    })
    .normalizeEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Your Password Must Be Greate Than 5 Chars"),
  body("confirmPassword")
    .isLength({ min: 5 })
    .withMessage("Your Password Must Be Greate Than 5 Chars")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword != req.body.password) {
        throw new Error("Password Does not Match");
      }
      return true;
    }),
];

router.get("/signup", signupGetController);
router.post("/signup", signupValidator, signupPostController);

router.get("/login", loginGetController);
router.post("/login", loginPostController);

router.get("/logout", logoutController);

module.exports = router;

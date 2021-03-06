const User = require("../models/User");
const Profile = require("../models/Profile");
const fs = require("fs");

exports.uploadProfilePics = async (req, res, next) => {
  if (req.file) {
    try {
      let profile = await Profile.findOne({ user: req.user._id });
      let profilePics = `/uploads/${req.file.filename}`;
      if (profile) {
        await Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: { profilePics } }
        );
      }

      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { profilePics } }
      );
      res.status(200).json({
        profilePics,
      });
    } catch (e) {
      res.status(500).json({
        profilePics: req.user.profilePics,
      });
    }
  } else {
    res.status(500).json({
      profilePics: req.user.profilePics,
    });
  }
};

exports.removeProfilePics = (req, res, next) => {
  try {
    let defaultProfile = "/uploads/default.png";
    let currentProfilePics = req.user.profilePics;

    fs.unlink(`public${currentProfilePics}`, async (err) => {
      let profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        await Profile.findOneAndDelete(
          { user: req.user._id },
          { $set: { profilePics: defaultProfile } }
        );
      }

      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { profilePics: defaultProfile } }
      );
    });
    res.status(200).json({ profilePics: defaultProfile });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Can not remove Profile Pics",
    });
  }
};

exports.postImageUploadController = (req, res, next) => {
  if (req.file) {
    return res.status(200).json({
      imgUrl: `/uploads/${req.file.filename}`,
    });
  }

  return res.status(500).json({
    message: "Server Error",
  });
};

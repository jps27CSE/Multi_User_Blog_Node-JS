// user , title ,bio , profilePics, links : {fb,twiiter,website}
// posts, bookmarks

const { Schema, model } = require("mongoose");

const User = require("./User");
const Post = require("./Post");

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    title: {
      type: string,
      trim: true,
      maxlength: 100,
    },
    bio: {
      type: string,
      trim: true,
      maxlength: 500,
    },
    profilePic: String,
    links: {
      website: string,
      facebook: string,
      twitter: string,
      github: string,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: Post,
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: Post,
      },
    ],
  },
  { timestamps: true }
);

const Profile = model("Profile", profileSchema);

module.exports = Profile;

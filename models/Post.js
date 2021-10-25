const { Schema, model } = require("mongoose");

const User = require("./User");
const Comment = require("./Comment");

const postSchema = new Schema(
  {
    title: {
      type: string,
      required: true,
      trim: true,
      maxlength: 100,
    },
    body: {
      type: string,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    tags: {
      type: [string],
      required: true,
    },
    thumbnail: string,
    readTime: string,
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: User,
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: User,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: Comment,
      },
    ],
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
module.exports = Post;

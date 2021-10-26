const { Schema, model } = require("mongoose");
const Profile = require("./Profile");

const userSchema = new Schema(
  {
    username: {
      type: string,
      trim: true,
      maxLength: 15,
      required: true,
    },
    email: {
      type: string,
      trim: true,
      required: true,
    },
    passwords: {
      type: string,
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: Profile,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
model.exports = User;

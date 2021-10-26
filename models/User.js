const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      maxLength: 15,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    passwords: {
      type: String,
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
model.exports = User;

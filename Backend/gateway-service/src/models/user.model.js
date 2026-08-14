import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);

import mongoose, { Schema } from "mongoose";
import { POSTER_CATEGORY, SOCIAL_PLATFORM } from "./model.constants.js";

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    title: {
      type: String,
      trim: true,
      maxlength: 160,
    },

    modelImage: {
      type: String,
      required: true,
    },

    productImage: {
      type: String,
      required: true,
    },

    currentposterImage: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: POSTER_CATEGORY,
      required: true,
    },

    platform: {
      type: String,
      enum: SOCIAL_PLATFORM,
      required: true,
    },

    includeText: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "completed",
        "failed",
      ],
      default: "pending",
      index: true,
    },

    mergeImage: {
      type: String,
      default: "",
    },
    
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({
  conversationId: 1,
  createdAt: 1,
});

export const Message = mongoose.model("Message", messageSchema);
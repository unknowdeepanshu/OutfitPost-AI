import mongoose, { Schema } from "mongoose";
import { POSTER_CATEGORY, SOCIAL_PLATFORM } from "./model.constants.js";

const conversationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },

    defaultCategory: {
      type: String,
      enum: POSTER_CATEGORY,
      default: "clothes",
    },

    defaultPlatform: {
      type: String,
      enum: SOCIAL_PLATFORM,
      default: "instagram",
    },

    includeTextByDefault: {
      type: Boolean,
      default: true,
    },

    aiContext: {
      tone: {
        type: String,
        default: "professional",
      },
      audience: {
        type: String,
        default: "general",
      },
      style: {
        type: String,
        default: "minimal",
      },
      additionalPrompt: {
        type: String,
        default: "",
        maxlength: 1000,
      },
    },

    messageCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastMessageAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Optimized for sidebar queries
conversationSchema.index({ userId: 1, lastMessageAt: -1 });

export const Conversation = mongoose.model("Conversation", conversationSchema);
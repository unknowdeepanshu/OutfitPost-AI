import mongoose, { Schema } from "mongoose";
import { POSTER_CATEGORY, SOCIAL_PLATFORM } from "./model.constants.js";

const messageData = new Schema(
  {
    modelImage: {
      url: {
        type: String,
        default: "",
        trim: true,
      },

      publicId: {
        type: String,
        default: "",
        trim: true,
      },
    },

    productImage: {
      url: {
        type: String,
        default: "",
        trim: true,
      },

      publicId: {
        type: String,
        default: "",
        trim: true,
      },
    },

    currentPosterImage: {
      type: String,
      default: "",
      trim: true,
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
    Description: {
      type: String,
      required: true,
    },

    includeText: {
      type: Boolean,
      default: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
  },
  {
    timestamps: true,
  },
);

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    MessageName: {
      type: String,
      trim: true,
      maxlength: 160,
    },

    MessageID: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    Data: {
      type: [messageData],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
      index: true,
    },

    errorMessage: {
      type: String,
      default: "",
    },

    mergeImage: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

messageSchema.index({
  conversationId: 1,
  createdAt: 1,
});

export const Message = mongoose.model("Message", messageSchema);

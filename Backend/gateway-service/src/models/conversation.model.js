import mongoose, { Schema } from "mongoose";
const conversationMessageSchema = new Schema(
  {
    messageId: {
      type: String,
      required: true,
    },
    messageName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
  },
  {
    _id: false,
  },
);
const conversationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    messages: {
      type: [conversationMessageSchema],
      default: [],
    },

    lastMessageAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Optimized for sidebar queries
conversationSchema.index({ userId: 1, lastMessageAt: -1 });

export const Conversation = mongoose.model("Conversation", conversationSchema);

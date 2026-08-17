import mongoose, { Schema } from "mongoose";

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

    category: {
      type: String,
      required: true,
      default: null,
    },

    platform: {
      type: String,
      required: true,
      default: null,
    },
    Description: {
      type: String,
      required: true,
    },

    includeText: {
      type: Boolean,
      default: false,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: null,
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

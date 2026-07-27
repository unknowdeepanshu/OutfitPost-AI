import mongoose, { Schema } from "mongoose";

const imageEditingSchema = new Schema(
  {
    messageId: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      required: true,
      index: true,
    },

    editedImages: [
      {
        version: {
          type: Number,
          required: true,
        },

        imageUrl: {
          type: String,
          required: true,
        },

        prompt: {
          type: String,
          trim: true,
          default: "",
        },

        editedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ImageEditing = mongoose.model(
  "ImageEditing",
  imageEditingSchema
);
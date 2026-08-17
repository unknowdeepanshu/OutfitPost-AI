import mongoose, { Schema } from "mongoose";

const imageEditingSchema = new Schema(
  {
    messageId: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      required: true,
      index: true,
    },
    MessageID: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    editedImages: [
      {
        previousImageUrl: {
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

        NewImageUrl: {
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
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const ImageEditing = mongoose.model("ImageEditing", imageEditingSchema);

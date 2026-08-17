import mongoose, { Schema } from "mongoose";

const imageUsageSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    downloadCount: {
      type: Number,
      default: 0,
    },

    generatedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const ImageUsage = mongoose.model("ImageUsage", imageUsageSchema);

const mongoose = require("mongoose");

const shortenedUrlSchema = mongoose.Schema(
  {
    shortenedUrl: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    clicks: {
      type: Number,
      default: 0,
    },
    creator: {
      type: String,
    },
    isPrivate: {},
    password: {},
  },
  {
    timestamps: true,
  }
);

const ShortUrl = mongoose.model("ShortUrl", shortenedUrlSchema);

module.exports = ShortUrl;

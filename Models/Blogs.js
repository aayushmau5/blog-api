const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      length: {
        min: 1,
        max: 200,
      },
    },
    post: {
      type: String,
      required: true,
      length: {
        min: 1,
      },
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);

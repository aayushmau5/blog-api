const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
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
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  author: { type: mongoose.tags.ObjectId, ref: "User", required: true },
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.Model("Blog", blogSchema);

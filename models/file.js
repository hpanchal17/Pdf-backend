const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  originalName: String,
  fileSize: Number,
  text: String,
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("File", fileSchema);

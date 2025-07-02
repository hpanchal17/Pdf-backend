const File = require("../models/file");
const extractText = require("../utils/extractText");

exports.uploadFile = async (req, res) => {
  try {
    const fileCount = await File.countDocuments({
      user: req.userId,
      isDeleted: false,
    });

    if (fileCount >= 5) {
      return res.status(400).json({ error: "Upload limit exceeded" });
    }

    const text = await extractText(req.file.buffer);

    const file = await File.create({
      user: req.userId,
      originalName: req.file.originalname,
      fileSize: req.file.size,
      text,
    });

    res.json(file);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Something went wrong during upload" });
  }
};
exports.listFiles = async (req, res) => {
  const files = await File.find({ user: req.userId, isDeleted: false });
  res.json(files);
};

exports.deleteFile = async (req, res) => {
  await File.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { isDeleted: true }
  );
  res.json({ message: "File soft-deleted" });
};

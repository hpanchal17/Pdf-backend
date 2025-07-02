const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const {
  uploadFile,
  listFiles,
  deleteFile,
} = require("../controllers/fileController");

router.post("/upload", auth, upload.single("file"), uploadFile);
router.get("/", auth, listFiles);
router.delete("/:id", auth, deleteFile);

module.exports = router;

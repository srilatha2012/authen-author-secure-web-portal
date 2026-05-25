const router = require("express").Router();
const Bookmark = require("../../models/Bookmark");
const { authMiddleware } = require("../../utils/auth");

// Protect all bookmark routes
router.use(authMiddleware);

// CREATE bookmark
router.post("/", async (req, res) => {
  try {
    const bookmark = await Bookmark.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(bookmark);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create bookmark",
      error: error.message,
    });
  }
});

// GET all bookmarks for logged-in user
router.get("/", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id });

    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get bookmarks",
      error: error.message,
    });
  }
});

// GET one bookmark only if user owns it
router.get("/:id", async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.json(bookmark);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get bookmark",
      error: error.message,
    });
  }
});

// UPDATE bookmark only if user owns it
router.put("/:id", async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.json(bookmark);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update bookmark",
      error: error.message,
    });
  }
});

// DELETE bookmark only if user owns it
router.delete("/:id", async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete bookmark",
      error: error.message,
    });
  }
});

module.exports = router;
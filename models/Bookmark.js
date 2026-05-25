const mongoose = require("mongoose");

//Define bookmark schema
const bookmarkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    url: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },
    // Reference to the user who owns this bookmark
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

//Create Bookmark model using bookmarkSchema
const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
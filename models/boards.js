const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Board name is required"],
    trim: true,
    maxlength: [50, "Board name cannot be longer than 50 characters"],
  },
  description: {
    type: String,
    required: false,
    trim: true,
    maxlength: [100, "Board description cannot be longer than 150 characters"],
    default: ""
  },
});

module.exports = mongoose.model("Boards", BoardSchema);

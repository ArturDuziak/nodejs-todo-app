const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    summary: {
      type: String,
      required: [true, "Task summary is required"],
      trim: true,
      maxlength: [50, "Task summary cannot be longer than 50 characters"],
    },
    description: {
      type: String,
      maxlength: [400, "Task description cannot be longer than 400 characters"],
    },
    status: {
      type: String,
      enum: ["to_do" | "in_progress" | "done"],
      default: "to_do",
    },
    priority: {
      type: String,
      enum: ["low" | "medium" | "high"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tasks", TaskSchema);

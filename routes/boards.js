const express = require("express");
const router = express.Router();

const {
  getAllBoards,
  getSpecificBoard,
  createBoard,
  deleteBoard,
  updateBoard,
  getBoardTasks,
} = require("../controllers/boards.js");

router.get("/", getAllBoards);
router.get("/:id", getSpecificBoard);
router.post("/", createBoard);
router.delete("/:id", deleteBoard);
router.put("/:id", updateBoard);
router.get("/:id/tasks", getBoardTasks);

module.exports = router;

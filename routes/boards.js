const express = require("express");
const router = express.Router();

const {
  getAllBoards,
  getSpecificBoard,
  createBoard,
  deleteBoard,
  updateBoard,
  getBoardTasks,
  editBoard,
  getSpecificBoardTask,
} = require("../controllers/boards.js");

router.get("/", getAllBoards);
router.get("/:id", getSpecificBoard);
router.post("/", createBoard);
router.delete("/:id", deleteBoard);
router.put("/:id", editBoard);
router.patch("/:id", updateBoard);
router.get("/:id/tasks", getBoardTasks);
router.get("/:boardID/tasks/:taskID", getSpecificBoardTask);

module.exports = router;

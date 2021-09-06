const Boards = require("../models/boards");
const asyncWrapper = require("../middleware/asyncWrapper");

const getAllBoards = asyncWrapper(async (req, res) => {
  const boards = await Boards.find({});

  res.status(200).json({
    boards,
  });
});

const getSpecificBoard = asyncWrapper(async (req, res) => {
  const { id: boardID } = req.params;
  const board = await Boards.findById(boardID);

  res.status(200).json(board);
});

const createBoard = (req, res) => {
  res.status(201).json({
    _id: 123,
    name: "Newly created board",
    description: "Description newly created board",
  });
};

const deleteBoard = (req, res) => {
  const { id: boardID } = req.params;

  res.status(200).json({ msg: "Board deleted successfully" });
};

const updateBoard = (req, res) => {
  const { id: boardID } = req.params;

  res.status(200).json({
    _id: boardID,
    name: "Updated board",
    description: "Description updated board",
  });
};

const getBoardTasks = (req, res) => {
  const { id: boardID } = req.params;

  res.status(200).json({
    tasks: [
      {
        summary: "Summary of first task",
        description: "Descritpion of first task",
        status: "to_do",
        priority: "high",
      },
    ],
  });
};

module.exports = {
  getAllBoards,
  getSpecificBoard,
  createBoard,
  deleteBoard,
  updateBoard,
  getBoardTasks,
};

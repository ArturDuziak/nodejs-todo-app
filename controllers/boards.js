const Boards = require("../models/boards");
const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/asyncWrapper");

const getAllBoards = asyncWrapper(async (req, res) => {
  const boards = await Boards.find({});

  res.status(200).json({
    boards,
  });
});

const getSpecificBoard = asyncWrapper(async (req, res, next) => {
  const { id: boardID } = req.params;
  const board = await Boards.findById(boardID);

  if (!board) {
    return next(createCustomError(`Cannot find board with id: ${boardID}`, 404));
  }

  res.status(200).json(board);
});

const createBoard = asyncWrapper(async (req, res) => {
  const board = await Boards.create(req.body);

  res.status(201).json({ board });
});

const deleteBoard = asyncWrapper(async (req, res) => {
  const { id: boardID } = req.params;

  res.status(200).json({ msg: "Board deleted successfully" });
});

const updateBoard = asyncWrapper(async (req, res) => {
  const { id: boardID } = req.params;

  res.status(200).json({
    _id: boardID,
    name: "Updated board",
    description: "Description updated board",
  });
});

const getBoardTasks = asyncWrapper(async (req, res) => {
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
});

module.exports = {
  getAllBoards,
  getSpecificBoard,
  createBoard,
  deleteBoard,
  updateBoard,
  getBoardTasks,
};

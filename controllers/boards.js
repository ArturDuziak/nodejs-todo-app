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

  const board = await Boards.findOneAndDelete({ _id: boardID });
  if (!board) {
    return res.status(404).json({ msg: `Cannot find task with id: ${boardID}` });
  }

  res.status(200).json({ msg: "Board deleted successfully" });
});

const editBoard = asyncWrapper(async (req, res) => {
  const { id: boardID } = req.params;

  const board = await Boards.findOneAndUpdate({ _id: boardID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });

  if (!board) {
    return res.status(404).json({ msg: `Cannot find task with id: ${boardID}` });
  }

  res.status(200).json({ board });
});

const updateBoard = asyncWrapper(async (req, res) => {
  const { id: boardID } = req.params;

  const board = await Boards.findOneAndUpdate({ _id: boardID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!board) {
    return res.status(404).json({ msg: `Cannot find task with id: ${boardID}` });
  }

  res.status(200).json({ board });
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
  editBoard,
};

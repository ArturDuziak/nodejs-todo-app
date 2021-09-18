const Boards = require("../models/boards");
const Tasks = require("../models/tasks");
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
  const board = await Boards.findById(boardID).populate("tasks");

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

const getBoardTasks = asyncWrapper(async (req, res, next) => {
  const { id: boardID } = req.params;

  const board = await Boards.findById(boardID).populate("tasks");

  if (!board) {
    return next(createCustomError(`Cannot find board with id: ${boardID}`, 404));
  }

  res.status(200).json(board.tasks);
});

const getSpecificBoardTask = asyncWrapper(async (req, res, next) => {
  const { boardID, taskID } = req.params;

  const board = await Boards.findById(boardID).populate("tasks");

  if (!board) {
    return next(createCustomError(`Cannot find board with id: ${boardID}`, 404));
  }

  const specificTask = board["tasks"].find((task) => task._id == taskID);

  if (!specificTask) {
    return next(
      createCustomError(`Cannot find task with id: ${taskID} in board with id: ${boardID}`, 404)
    );
  }

  res.status(200).json(specificTask);
});

const createTaskInBoard = asyncWrapper(async (req, res, next) => {
  const { boardID } = req.params;

  const board = await Boards.findById(boardID);

  if (!board) {
    return next(createCustomError(`Cannot find board with id: ${boardID}`, 404));
  }

  const task = await Tasks.create(req.body);

  const newBoard = await Boards.findOneAndUpdate(
    { _id: boardID },
    { $push: { tasks: task._id } },
    {
      new: true,
      runValidators: true,
    }
  ).populate("tasks");

  res.status(201).json(newBoard);
});

const deleteTaskInBoard = asyncWrapper(async (req, res, next) => {
  const { taskID } = req.params;

  const task = await Tasks.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`Cannot find task with id: ${taskID}`, 404));
  }

  res.status(200).json({ msg: "Task deleted successfully" });
});

module.exports = {
  getAllBoards,
  getSpecificBoard,
  createBoard,
  deleteBoard,
  updateBoard,
  getBoardTasks,
  editBoard,
  getSpecificBoardTask,
  createTaskInBoard,
  deleteTaskInBoard,
};

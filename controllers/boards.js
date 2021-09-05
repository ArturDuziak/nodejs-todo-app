const getAllBoards = (req, res) => {
  res.status(200).json({
    boards: [
      { _id: 123, name: "Example of board name", description: "Description of example board" },
      {
        _id: 1234,
        name: "Example of second board name",
        description: "Description of second example board",
      },
    ],
  });
};

const getSpecificBoard = (req, res) => {
  const { id: boardID } = req.params;
  res.status(200).json({
    _id: boardID,
    name: "Example of board name",
    description: "Description of example board",
  });
};

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

const express = require("express");
require("dotenv").config();
const app = express();
const boards = require("./routes/boards");
const connectDB = require("./db/connect");

app.use(express.json());

// Routes
app.use("/api/v1/boards", boards);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

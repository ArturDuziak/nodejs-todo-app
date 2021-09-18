const express = require("express");
require("dotenv").config();
const app = express();
const boards = require("./routes/boards");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

require('./models')
app.use(express.json());

// Routes
app.use("/api/v1/boards", boards);

// Controller for routes that don't exist
app.use(notFound);

app.use(errorHandler);

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

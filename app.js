const express = require("express");
const app = express();
const boards = require("./routes/boards");

const port = process.env.PORT || 3000;

// Routes
app.use("/api/v1/boards", boards);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

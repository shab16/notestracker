const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;

const successResponse = {
  code: "60001",
  message: "notes fetched successfully",
  status: "SUCCESS",
};

const failureResponse = {
  code: "60003",
  message: "note not found",
  status: "FAIL",
};

const app = express();

app.listen(PORT, () => {
  console.log("Server is now listening on port 5000");
});

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.get("/api/notes", (req, res) => {
  res.json({
    response_status: successResponse,
    notes,
  });
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);

  if (note) {
    res.json({
      response_status: successResponse,
      note,
    });
  } else {
    res.status(404).json({
      response_status: failureResponse,
    });
  }
});

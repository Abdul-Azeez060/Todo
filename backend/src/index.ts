import express from "express";
import cors from "cors";
const app = express();
import { todos } from "./todos";

app.use(cors());
app.use(express.json());

let count = 3;
app.get("/todos", (req, res) => {
  res.status(200).json({
    todos,
  });
});

app.post("/todos/new", (req, res) => {
  const todo = req.body.todo;
  count++;
  todos.push({ id: count, name: todo, isDone: false });
  res.status(200).json({
    success: "added todo successfull",
  });
});

app.listen(8000, () => console.log("server is running"));

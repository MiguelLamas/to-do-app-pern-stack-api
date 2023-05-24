const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined




// middleware
app.use(express.json()); // giving us access to req.body so we can get JSON Data.
app.use(cors());

// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("./client/build"));

if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")))
};

// ROUTES //

// CREATE A TODO
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
    res.setHeader("Access-Control-Allow-Credentials", "true"); // ignores cors origin errors
  } catch (err) {
    console.error(err.message);
  }
});

// GET ALL TODOS
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
    res.setHeader("Access-Control-Allow-Credentials", "true"); // ignores cors origin errors
  } catch (err) {
    console.error(err.message);
  }
});

// GET A TODO
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
    res.setHeader("Access-Control-Allow-Credentials", "true"); // ignores cors origin errors
  } catch (err) {
    console.error(err.message);
  }
});

// UPDATE A TODO
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
    res.setHeader("Access-Control-Allow-Credentials", "true"); // ignores cors origin errors
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE A TODO
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted!");
    res.setHeader("Access-Control-Allow-Credentials", "true"); // ignores cors origin errors
  } catch (err) {
    console.error(err.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
  res.setHeader("Access-Control-Allow-Credentials", "true"); // ignores cors origin errors
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

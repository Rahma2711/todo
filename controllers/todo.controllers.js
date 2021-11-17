const Todo = require("../models/todo.models");

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.json(todos);
  } catch (err) {
    return res.status(500).json({success:false, error : "internal server error"});
  }
};
const getTodoById = async (req, res) => {
  const id = req.params.todoid;
  try {
    const todo = await Todo.findById(id);
    return res.status(200).json(todo);
  } catch (err) {
    return res.status(500).json({success:false, error : "internal server error"});
  }
};
const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      description: req.body.description,
    });
    const savedTodo = await newTodo.save();
    return res.status(200).json(savedTodo);
  } catch (err) {
    return res.status(500).json({success:false, error : "internal server error"});
  }
};
const deleteTodo = async (req, res) => {
  const id = req.params.todoid;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    return res.status(204);
  } catch (err) {
    return res.status(500).json({success:false, error : "internal server error"});
  }
};
const updateTodo = async (req, res) => {
  const id = req.params.todoid;
  const {title , description , isCompleted} = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, {title, description, isCompleted}, { new: true });
    return res.status(200).json(updatedTodo);
  } catch (err) {
    return res.status(500).json({success:false, error : "internal server error"});
  }
};
module.exports.getAllTodos = getAllTodos;
module.exports.createTodo = createTodo;
module.exports.deleteTodo = deleteTodo;
module.exports.getTodoById = getTodoById;
module.exports.updateTodo = updateTodo;
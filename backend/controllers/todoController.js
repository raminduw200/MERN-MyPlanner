import Todo from "../models/todoModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user todos
// @route   GET /api/todos
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
});

//@description     Fetch single Todo
//@route           GET /api/todos/:id
//@access          Public
const getTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }

  res.json(todo);
});

//@description     Create single Todo
//@route           GET /api/todos/create
//@access          Private
const CreateTask = asyncHandler(async (req, res) => {
  const { Heading, Description, PriorityLevel } = req.body;

  if (!Heading || !Description || !PriorityLevel) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const todo = new Todo({ user: req.user._id, Heading, Description, PriorityLevel });

    const createdTodo = await todo.save();

    res.status(201).json(createdTodo);
  }
});

//@description     Delete single Todo
//@route           GET /api/todos/:id
//@access          Private
const TaskDone = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (todo) {
    await todo.remove();
    res.json({ message: "Todo Removed" });
  } else {
    res.status(404);
    throw new Error("Todo not Found");
  }
});

// @desc    Update a Todo
// @route   PUT /api/todos/:id
// @access  Private
const UpdateTask = asyncHandler(async (req, res) => {
  const { Heading, Description, PriorityLevel } = req.body;

  const todo = await Todo.findById(req.params.id);

  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (todo) {
    todo.Heading = Heading
    todo.Description = Description;
    todo.PriorityLevel = PriorityLevel;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } else {
    res.status(404);
    throw new Error("Todo not found");
  }
});

export { getTodoById, getTodos, CreateTask, TaskDone, UpdateTask };

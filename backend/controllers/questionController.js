import Question from "../models/questionModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user questions
// @route   GET /api/questions
// @access  Private
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({ user: req.user._id });
  res.json(questions);
});

//@description     Fetch single Question
//@route           GET /api/questions/:id
//@access          Public
const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (question) {
    res.json(question);
  } else {
    res.status(404).json({ message: "Question not found" });
  }

  res.json(question);
});

//@description     Create single Question
//@route           GET /api/questions/create
//@access          Private
const CreateQuestion = asyncHandler(async (req, res) => {
  const { que, answer, subject } = req.body;

  if (!que || !answer || !subject) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const question = new Question({ user: req.user._id, que, answer, subject });

    const createdQuestion = await question.save();

    res.status(201).json(createdQuestion);
  }
});

//@description     Delete single Question
//@route           GET /api/questions/:id
//@access          Private
const DeleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (question.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (question) {
    await question.remove();
    res.json({ message: "Question Removed" });
  } else {
    res.status(404);
    throw new Error("Question not Found");
  }
});

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Private
const UpdateQuestion = asyncHandler(async (req, res) => {
  const { que, answer, subject } = req.body;

  const question = await Question.findById(req.params.id);

  if (question.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (question) {
    question.que = que;
    question.answer = answer;
    question.subject = subject;

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

export { getQuestionById, getQuestions, CreateQuestion, DeleteQuestion, UpdateQuestion };

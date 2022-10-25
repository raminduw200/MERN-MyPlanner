import express from "express";
import {
  getQuestionById,
  getQuestions,
  CreateQuestion,
  DeleteQuestion,
  UpdateQuestion
} from "../controllers/questionController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getQuestions);
router
  .route("/:id")
  .get(getQuestionById)
  .delete(protect, DeleteQuestion)
  .put(protect, UpdateQuestion);
router.route("/create").post(protect, CreateQuestion);

export default router;

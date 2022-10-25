import express from "express";
import {
  getTodoById, 
  getTodos, 
  CreateTask, 
  TaskDone, 
  UpdateTask,
} from "../controllers/todoController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getTodos);
router
  .route("/:id")
  .get(getTodoById)
  .delete(protect, TaskDone)
  .put(protect, UpdateTask);
router.route("/create").post(protect, CreateTask);

export default router;
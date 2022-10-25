import express from "express";
import {
    getEssayById,
    getEssays,
    CreateEssay,
    DeleteEssay,
    UpdateEssay,
} from "../controllers/essayController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getEssays);
router
    .route("/:id")
    .get(getEssayById)
    .delete(protect, DeleteEssay)
    .put(protect, UpdateEssay);
router.route("/create").post(protect, CreateEssay);

export default router;

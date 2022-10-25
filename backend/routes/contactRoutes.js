import express from "express";
import {
  getContactById,
  getContacts,
  CreateContact,
  DeleteContact,
  UpdateContact,
} from "../controllers/contactController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getContacts);
router
  .route("/:id")
  .get(getContactById)
  .delete(protect, DeleteContact)
  .put(protect, UpdateContact);
router.route("/create").post(protect, CreateContact);

export default router;

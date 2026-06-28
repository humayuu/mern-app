import express from "express";
import {
  updateTask,
  createTask,
  getAllTask,
  getTaskById,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/task", getAllTask);
router.get("/task/:id", getTaskById);
router.post("/task", createTask);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;

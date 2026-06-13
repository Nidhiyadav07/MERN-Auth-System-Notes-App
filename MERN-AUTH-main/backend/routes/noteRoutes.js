import express from "express";
import {
  createNote,
  getNotes,
  deleteNote,
} from "../controllers/noteController.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();
console.log("noteRoutes loaded");

router.post("/create", isAuthenticated, createNote);

router.get("/all", isAuthenticated, getNotes);

router.delete("/:id", isAuthenticated, deleteNote);

export default router;

import express from "express";
import {
  createInterviewer,
  deleteInterviewer,
  getInterviewer,
  getInterviewers,
  updateInterviewer,
} from "../controllers/interviewer.js";

const router = express.Router();

// CREATE Interviewer
router.post("/", createInterviewer);

// UPDATE Interviewer
router.put("/:id", updateInterviewer);

// DELETE Interviewer
router.delete("/:id", deleteInterviewer);

// GET all Interviewers
router.get("/", getInterviewers);

// GET a particular interviewer
router.get("/:id", getInterviewer);

export default router;

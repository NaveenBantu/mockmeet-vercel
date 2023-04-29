import express from "express";
import {
  createMock,
  updateMock,
  deleteMock,
  getMock,
  getMocks,
  getMockInterviewers,
} from "../controllers/mock.js";

const router = express.Router();

// CREATE
router.post("/", createMock);

// UPDATE
router.put("/:id", updateMock);

// DELETE
router.delete("/:id", deleteMock);

// GET All Mocks
router.get("/", getMocks);

// GET a particular Mock
router.get("/:id", getMock);

// GET all interviewers
router.get("/interviewer/:id", getMockInterviewers);

export default router;

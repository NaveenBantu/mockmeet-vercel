import express from "express";
import {
  createMock,
  updateMock,
  deleteMock,
  getMock,
  getMocks,
} from "../controllers/mock.js";
import {
  ClerkExpressRequireAuth,
  ClerkExpressWithAuth,
} from "@clerk/clerk-sdk-node";

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

export default router;

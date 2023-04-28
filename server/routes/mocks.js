import express from "express";
import Mock from "../models/Mock.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const newMock = new Mock(req.body);
  try {
    const savedMock = await newMock.save();
    res.status(200).json(savedMock);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;

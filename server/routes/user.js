import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getInterviewers,
  getUserInterviews,
} from "../controllers/user.js";

const router = express.Router();

//create User
router.post("/create", createUser);

//update User
router.put("/update", updateUser);

//DELETE Users
router.post("/delete", deleteUser);

//GET all Users
router.get("/", getUsers);

//GET all Interviewers
router.get("/interviewer", getInterviewers);

//GEt particular User
router.get("/:id", getUser);

// //Get all interviews of a particular user
// router.get("/:id/interviews", getUserInterviews);

export default router;

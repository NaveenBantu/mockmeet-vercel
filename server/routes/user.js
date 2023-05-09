import Express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUserInterviews,
} from "../controllers/user.js";

const router = Express.Router();

//create User
router.post("/", createUser);

//update User
router.put("/:id", updateUser);

//DELETE Users
router.delete("/:id", deleteUser);

//GET all Users
router.get("/", getUsers);

//GEt particular User
router.get("/:id", getUser);

//Get all interviews of a particular user
router.get("/:id/interviews", getUserInterviews);

export default router;

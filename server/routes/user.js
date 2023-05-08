import Express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
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
export default router;

import Express from "express";
import {
  createInterview,
  updateInterview,
  deleteInterview,
  getInterview,
  getInterviews,
} from "../controllers/bookingInterview.js";

const router = Express.Router();

//create interview
router.post("/", createInterview);

//update interview
router.put("/:id", updateInterview);

//DELETE Interviews
router.delete("/:id", deleteInterview);

//GET all Interviews - /user/s/:id or /user/i/:id
router.get("/user/:role/:userID", getInterviews);

//GEt particular interview
router.get("/:id", getInterview);
export default router;

import Express from "express";
import {
    createInterview,
    updateInterviews,
    deleteInterview,
    getInterview,
    getInterviews
} from "../controllers/bookingInterview.js";

const router = Express.Router();

//create interview
router.post("/", createInterview);

//update interview
router.put("/:id", updateInterviews);

//DELETE Interviews
router.delete("/:id", deleteInterview);

//GET all Interviews
router.get("/", getInterviews);

//GEt particular interview
router.get("/:id", getInterview);
export default router;

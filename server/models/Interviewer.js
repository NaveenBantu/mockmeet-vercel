// Schema of an Interviewer
import mongoose from "mongoose";
const InterviewerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    interviewTypes: {
      type: [{ mockType: String, availableDates: { type: [Date] } }],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Interviewer", InterviewerSchema);

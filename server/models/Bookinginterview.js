import mongoose from "mongoose";

const BookedInterview = new mongoose.Schema({
  mock_id: {
    type: mongoose.Types.ObjectId,
    ref: "Mock",
  },
  total_score: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  student_id: {
    type: String,
    required: true,
  },
  interviewer_id: {
    // type: String,
    // required: true,
    type: mongoose.Types.ObjectId,
    ref: "Interviewer",
  },
  iscompleted: {
    type: Boolean,
    default: false,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  feedback: {
    type: String,
    default: "",
  },
});
export default mongoose.model("Interviews", BookedInterview);

import mongoose from "mongoose";

const BookedInterview = new mongoose.Schema({
  mock_id: {
    type: String,
    required: true,
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
    type: String,
    required: true,
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
export default Interviews = mongoose.model("Interviews", BookedInterview);

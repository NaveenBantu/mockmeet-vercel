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
});

export default mongoose.model("Interview", BookedInterview);

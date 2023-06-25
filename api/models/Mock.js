import mongoose from "mongoose";

const MockSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  // interviewers: [{ type: mongoose.Types.ObjectId, ref: "Interviewer" }],
});

export default mongoose.model("Mock", MockSchema);

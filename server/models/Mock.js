import mongoose from "mongoose";

const MockSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  interviewers: {
    type: [String],
  },
});

export default mongoose.model("Mock", MockSchema);

import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    clerk_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    isInterviewer: {
      type: Boolean,
      default: false,
    },
    overall_score: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    availableDates: { type: [Date] },
    interviews: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

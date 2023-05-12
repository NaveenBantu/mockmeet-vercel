import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    overall_score: {
      type: Number,
      required: true,
    },
    interviews: [{ type: String }],
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

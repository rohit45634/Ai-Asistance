import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    assistantImage: {
      type: String,
    },
    assistantName: {
      type: String,
    },
    history: [{ type: String }],
  },
  { timestamps: true } // ✅ correct way
);

const User = mongoose.model("User", userSchema);
export default User;

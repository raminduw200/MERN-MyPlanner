import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    Heading: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    PriorityLevel: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;

import dotenv from "dotenv";
import User from "./models/userModel.js";
import Note from "./models/noteModel.js";
import Essay from "./models/essayModel.js";
import Contact from "./models/contactModel.js";
import Todo from "./models/todoModel.js";
import Question from "./models/questionModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const destroyData = async () => {
  try {
    await Note.deleteMany();
    await User.deleteMany();
    await Essay.deleteMany();
    await Contact.deleteMany();
    await Todo.deleteMany();
    await Question.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

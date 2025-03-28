import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  title: String,
  description: String,
});

const TodoDB = mongoose.models.TodoDB || mongoose.model("TodoDB", todoSchema);

export default TodoDB;

import { Schema, model } from "mongoose";

const UserSchema = Schema({
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export default model("user", UserSchema);

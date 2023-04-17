import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { IUserSchema } from "../../types/userModelSchemaTypes";

const UserSchema = new Schema<IUserSchema>({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 15,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide  valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

export default mongoose.model<IUserSchema>("User", UserSchema);

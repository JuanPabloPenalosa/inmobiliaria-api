import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const inmuebleSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

inmuebleSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

inmuebleSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

export default model("User", inmuebleSchema);

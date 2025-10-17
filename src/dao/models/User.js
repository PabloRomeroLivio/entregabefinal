import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    pets: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pets",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model(collection, schema);

export default userModel;

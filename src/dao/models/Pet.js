import mongoose from "mongoose";

const collection = "Pets";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specie: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
    },
    adopted: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const petModel = mongoose.model(collection, schema);

export default petModel;

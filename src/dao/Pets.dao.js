import petModel from "./models/Pet.js";

export default class PetsDao {
  getAll = async (params = {}) => {
    const pets = await petModel.find(params).lean();
    return Array.isArray(pets) ? pets : [];
  };

  get = async (params = {}) => {
    const pets = await petModel.find(params).lean();
    return Array.isArray(pets) ? pets : [];
  };

  getBy = async (params) => {
    const pet = await petModel.findOne(params).lean();
    return pet || null;
  };

  save = async (doc) => {
    const pet = await petModel.create(doc);
    return pet.toObject ? pet.toObject() : pet;
  };

  update = async (id, doc) => {
    const updated = await petModel.findByIdAndUpdate(id, { $set: doc }, { new: true }).lean();
    return updated || null;
  };

  delete = async (id) => {
    const deleted = await petModel.findByIdAndDelete(id).lean();
    return deleted || null;
  };
}

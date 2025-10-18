import adoptionModel from "./models/Adoption.js";

export default class AdoptionsDao {
  getAll = async (params = {}) => {
    const adoptions = await adoptionModel.find(params).populate(["owner", "pet"]).lean();
    return Array.isArray(adoptions) ? adoptions : [];
  };

  get = async (params = {}) => {
    const adoptions = await adoptionModel.find(params).populate(["owner", "pet"]).lean();
    return Array.isArray(adoptions) ? adoptions : [];
  };

  getBy = async (params) => {
    const adoption = await adoptionModel.findOne(params).populate(["owner", "pet"]).lean();
    return adoption || null;
  };

  save = async (doc) => {
    const adoption = await adoptionModel.create(doc);
    return adoption.toObject ? adoption.toObject() : adoption;
  };

  update = async (id, doc) => {
    const updated = await adoptionModel.findByIdAndUpdate(id, { $set: doc }, { new: true }).lean();
    return updated || null;
  };

  delete = async (id) => {
    const deleted = await adoptionModel.findByIdAndDelete(id).lean();
    return deleted || null;
  };
}

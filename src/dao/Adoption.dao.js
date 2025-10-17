import adoptionModel from "./models/Adoption.js";

export default class AdoptionsDao {
  get = (params) => {
    return adoptionModel.find(params).populate(["owner", "pet"]);
  };

  getBy = (params) => {
    return adoptionModel.findOne(params).populate(["owner", "pet"]);
  };

  save = (doc) => {
    return adoptionModel.create(doc);
  };

  update = (id, doc) => {
    return adoptionModel.findByIdAndUpdate(id, { $set: doc }, { new: true });
  };

  delete = (id) => {
    return adoptionModel.findByIdAndDelete(id);
  };
}

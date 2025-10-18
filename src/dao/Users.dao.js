import userModel from "./models/User.js";

export default class UsersDao {
  getAll = async (params = {}) => {
    const users = await userModel.find(params).lean();
    return Array.isArray(users) ? users : [];
  };

  get = async (params = {}) => {
    const users = await userModel.find(params).lean();
    return Array.isArray(users) ? users : [];
  };

  getBy = async (params) => {
    const user = await userModel.findOne(params).lean();
    return user || null;
  };

  save = async (doc) => {
    const user = await userModel.create(doc);
    return user.toObject ? user.toObject() : user;
  };

  update = async (id, doc) => {
    const updated = await userModel.findByIdAndUpdate(id, { $set: doc }, { new: true }).lean();
    return updated || null;
  };

  delete = async (id) => {
    const deleted = await userModel.findByIdAndDelete(id).lean();
    return deleted || null;
  };
}

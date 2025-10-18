import GenericRepository from "./GenericRepository.js";
import { createHash } from "../utils/index.js";

export default class UserRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  async createUser(userData) {
    if (!userData) throw new Error("User data is required");
    if (userData.password) {
      userData.password = await createHash(userData.password);
    }
    return await this.dao.save(userData);
  }

  async getAllUsers() {
    return await this.dao.getAll();
  }

  async getUserById(id) {
    if (!id) return null;
    return await this.dao.getBy({ _id: id });
  }

  async getUserByEmail(email) {
    if (!email) return null;
    return await this.dao.getBy({ email });
  }

  async updateUser(id, updatedData) {
    if (!id || !updatedData) throw new Error("ID and updated data are required");
    if (updatedData.password) {
      updatedData.password = await createHash(updatedData.password);
    }
    return await this.dao.update(id, updatedData);
  }

  async deleteUser(id) {
    if (!id) return null;
    return await this.dao.delete(id);
  }
}

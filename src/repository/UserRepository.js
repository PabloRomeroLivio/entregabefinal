import GenericRepository from "./GenericRepository.js";

export default class UserRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  async getUserByEmail(email) {
    return await this.getBy({ email });
  }

  async getUserById(id) {
    return await this.getBy({ _id: id });
  }

  async save(userData) {
    return await this.dao.save(userData);
  }
}

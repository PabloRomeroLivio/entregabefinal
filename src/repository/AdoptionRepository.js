import GenericRepository from "./GenericRepository.js";

export default class AdoptionRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  async getById(id) {
    return await this.getBy({ _id: id });
  }

  async create(doc) {
    return await this.dao.save(doc);
  }
}

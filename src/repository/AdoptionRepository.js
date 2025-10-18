import GenericRepository from "./GenericRepository.js";

export default class AdoptionRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  async getById(id) {
    if (!id) return null;
    return await this.dao.getBy({ _id: id });
  }

  async create(doc) {
    if (!doc) throw new Error("Adoption data is required");
    return await this.dao.save(doc);
  }

  async getAllAdoptions() {
    return await this.dao.getAll();
  }

  async deleteAdoption(id) {
    if (!id) return null;
    return await this.dao.delete(id);
  }
}

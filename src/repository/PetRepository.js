import GenericRepository from "./GenericRepository.js";

export default class PetRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  async getPetById(id) {
    return await this.getBy({ _id: id });
  }

  async updatePet(id, data) {
    return await this.dao.update(id, data);
  }
}

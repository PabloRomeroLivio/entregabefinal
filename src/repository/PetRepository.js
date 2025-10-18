import GenericRepository from "./GenericRepository.js";

export default class PetRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  async createPet(petData) {
    if (!petData) throw new Error("Pet data is required");
    return await this.dao.save(petData);
  }

  async getAllPets() {
    return await this.dao.getAll();
  }

  async getPetById(id) {
    if (!id) return null;
    return await this.dao.getBy({ _id: id });
  }

  async updatePet(id, data) {
    if (!id || !data) return null;
    return await this.dao.update(id, data);
  }

  async deletePet(id) {
    if (!id) return null;
    return await this.dao.delete(id);
  }
}

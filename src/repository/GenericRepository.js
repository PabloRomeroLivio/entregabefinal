export default class GenericRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getAll(params) {
    return await this.dao.get(params);
  }

  async getBy(params) {
    return await this.dao.getBy(params);
  }

  async create(doc) {
    return await this.dao.save(doc);
  }

  async update(id, doc) {
    return await this.dao.update(id, doc);
  }

  async delete(id) {
    return await this.dao.delete(id);
  }
}

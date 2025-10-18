export default class GenericRepository {
  constructor(dao) {
    if (!dao) throw new Error("DAO is required");
    this.dao = dao;
  }


  async getAll(params = {}) {
    const result = await this.dao.get(params);
    if (!result || !Array.isArray(result)) return [];
    return result.map(doc => (doc.toObject ? doc.toObject() : doc));
  }

 
  async getBy(params) {
    if (!params) return null;
    const doc = await this.dao.getBy(params);
    return doc ? (doc.toObject ? doc.toObject() : doc) : null;
  }

 
  async create(doc) {
    if (!doc) throw new Error("Document data is required");
    const created = await this.dao.save(doc);
    return created ? (created.toObject ? created.toObject() : created) : null;
  }

  async update(id, doc) {
    if (!id) throw new Error("Document ID is required");
    if (!doc) throw new Error("Updated data is required");
    const updated = await this.dao.update(id, doc);
    return updated ? (updated.toObject ? updated.toObject() : updated) : null;
  }


  async delete(id) {
    if (!id) throw new Error("Document ID is required");
    const deleted = await this.dao.delete(id);
    return deleted ? (deleted.toObject ? deleted.toObject() : deleted) : null;
  }
}

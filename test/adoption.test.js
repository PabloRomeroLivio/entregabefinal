import chai from 'chai';
import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../src/app.js';

dotenv.config();

const expect = chai.expect;
const request = supertest(app);

describe('🧪 Tests funcionales - Adoptions API', function () {
  this.timeout(15000);

  let testUser;
  let testPet;
  let testAdoption;


  before(async () => {
    const userRes = await request.post('/api/users').send({
      first_name: 'AdoptTest',
      last_name: 'User',
      email: `adopt${Date.now()}@example.com`,
      password: '123456'
    });
    testUser = userRes.body.payload;

    const petRes = await request.post('/api/pets').send({
      name: 'Buddy',
      specie: 'dog',
      birthDate: '2022-01-01'
    });
    testPet = petRes.body.payload;
  });


  it('POST /api/adoptions/:uid/:pid debe crear una adopción', async () => {
    const res = await request.post(`/api/adoptions/${testUser._id}/${testPet._id}`);
    expect(res.statusCode).to.equal(201);
    expect(res.body.payload).to.have.property('user', testUser._id);
    expect(res.body.payload).to.have.property('pet', testPet._id);
    testAdoption = res.body.payload;
  });


  it('GET /api/adoptions debe devolver todas las adopciones', async () => {
    const res = await request.get('/api/adoptions');
    expect(res.statusCode).to.equal(200);
    expect(res.body.payload).to.be.an('array');
    const found = res.body.payload.find(a => a._id === testAdoption._id);
    expect(found).to.exist;
  });


  it('GET /api/adoptions/:aid debe devolver una adopción específica', async () => {
    const res = await request.get(`/api/adoptions/${testAdoption._id}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.payload).to.have.property('_id', testAdoption._id);
  });


  it('DELETE /api/adoptions/:aid debe eliminar la adopción', async () => {
    const res = await request.delete(`/api/adoptions/${testAdoption._id}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
  });


  it('GET /api/adoptions/:aid con ID inválido debe retornar 404', async () => {
    const fakeId = '670cb8e86df9a1f4e6a8f111';
    const res = await request.get(`/api/adoptions/${fakeId}`);
    expect(res.statusCode).to.be.oneOf([400, 404]);
  });
});

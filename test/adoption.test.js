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


  it('POST /api/users debe crear un usuario', async () => {
    const res = await request.post('/api/users').send({
      first_name: 'Test',
      last_name: 'User',
      email: `test${Date.now()}@mail.com`,
      password: '123456'
    });

    expect(res.statusCode).to.be.oneOf([200, 201]);
    expect(res.body.payload).to.have.property('_id');
    testUser = res.body.payload;
  });


  it('POST /api/pets debe crear una mascota', async () => {
    const res = await request.post('/api/pets').send({
      name: 'Buddy',
      specie: 'dog',
      birthDate: '2021-01-01',
      adopted: false
    });

    expect(res.statusCode).to.be.oneOf([200, 201]);
    expect(res.body.payload).to.have.property('_id');
    testPet = res.body.payload;
  });


  it('POST /api/adoptions/:uid/:pid debe crear una adopción', async () => {
    const res = await request.post(`/api/adoptions/${testUser._id}/${testPet._id}`);
    expect(res.statusCode).to.be.oneOf([200, 201]);
    expect(res.body.payload).to.have.property('_id');
    testAdoption = res.body.payload;
  });

  it('GET /api/adoptions debe devolver todas las adopciones', async () => {
    const res = await request.get('/api/adoptions');
    expect(res.statusCode).to.equal(200);
    expect(res.body.payload).to.be.an('array');
  });


  it('GET /api/adoptions/:aid debe devolver la adopción creada', async () => {
    const res = await request.get(`/api/adoptions/${testAdoption._id}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.payload).to.have.property('_id', testAdoption._id);
  });


  it('GET /api/adoptions/:aid con ID inválido debe retornar 404 o 400', async () => {
    const res = await request.get('/api/adoptions/670cb8e86df9a1f4e6a8f111');
    expect(res.statusCode).to.be.oneOf([400, 404]);
  });
});

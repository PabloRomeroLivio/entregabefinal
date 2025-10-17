import chai from 'chai';
import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../src/app.js';

dotenv.config();

const expect = chai.expect;
const request = supertest(app);

describe('🧪 Tests funcionales - Pets API', function () {
  this.timeout(15000);

  let testPet;

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
    console.log('🐾 Mascota creada:', testPet._id);
  });

  it('GET /api/pets debe devolver todas las mascotas', async () => {
    const res = await request.get('/api/pets');
    expect(res.statusCode).to.equal(200);
    expect(res.body.payload).to.be.an('array');
  });

  it('GET /api/pets/:pid debe devolver la mascota creada', async () => {
    const res = await request.get(`/api/pets/${testPet._id}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.payload).to.have.property('_id', testPet._id);
  });


  it('PUT /api/pets/:pid debe actualizar la mascota', async () => {
    const res = await request.put(`/api/pets/${testPet._id}`).send({
      name: 'BuddyUpdated',
      adopted: true
    });
    expect(res.body.payload.adopted).to.be.true;
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
  });

  it('PUT /api/pets/:pid con ID inválido debe retornar 404', async () => {
    const fakeId = '670cb8e86df9a1f4e6a8f111';
    const res = await request.put(`/api/pets/${fakeId}`).send({ name: 'ErrorPet' });
    expect(res.statusCode).to.be.oneOf([400, 404]);
  });


  it('DELETE /api/pets/:pid debe eliminar la mascota', async () => {
    const res = await request.delete(`/api/pets/${testPet._id}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
  });


  it('DELETE /api/pets/:pid con ID inválido debe retornar 404', async () => {
    const fakeId = '670cb8e86df9a1f4e6a8f111';
    const res = await request.delete(`/api/pets/${fakeId}`);
    expect(res.statusCode).to.be.oneOf([400, 404]);
  });
});

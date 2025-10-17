import chai from 'chai';
import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../src/app.js';
import bcrypt from 'bcrypt';

dotenv.config();

const expect = chai.expect;
const request = supertest(app);

describe('🧪 Tests funcionales - Users API', function () {
  this.timeout(15000);

  let testUser;
  let password = '123456';


  it('POST /api/users debe crear un usuario', async () => {
    const res = await request.post('/api/users').send({
      first_name: 'Test',
      last_name: 'User',
      email: `test${Date.now()}@example.com`,
      password
    });

    expect(res.statusCode).to.be.oneOf([200, 201]);
    expect(res.body.payload).to.have.property('_id');
    testUser = res.body.payload;
    console.log('👤 Usuario creado:', testUser._id);

    const match = await bcrypt.compare(password, testUser.password);
    expect(match).to.be.true;
  });


  it('GET /api/users debe devolver todos los usuarios', async () => {
    const res = await request.get('/api/users');
    expect(res.statusCode).to.equal(200);
    expect(res.body.payload).to.be.an('array');
  });


  it('GET /api/users/:uid debe devolver el usuario creado', async () => {
    const res = await request.get(`/api/users/${testUser._id}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.payload).to.have.property('_id', testUser._id);
  });


  it('PUT /api/users/:uid debe actualizar el usuario', async () => {
    const newPassword = 'newpassword';
    const res = await request.put(`/api/users/${testUser._id}`).send({
      first_name: 'UpdatedName',
      password: newPassword
    });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('status', 'success');


    const getRes = await request.get(`/api/users/${testUser._id}`);
    expect(getRes.body.payload.first_name).to.equal('UpdatedName');

    const match = await bcrypt.compare(newPassword, getRes.body.payload.password);
    expect(match).to.be.true;
  });


  it('DELETE /api/users/:uid debe eliminar el usuario', async () => {
    const res = await request.delete(`/api/users/${testUser._id}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
  });


  it('DELETE /api/users/:uid con ID inválido debe retornar 404', async () => {
    const fakeId = '670cb8e86df9a1f4e6a8f111';
    const res = await request.delete(`/api/users/${fakeId}`);
    expect(res.statusCode).to.be.oneOf([400, 404]);
  });
});

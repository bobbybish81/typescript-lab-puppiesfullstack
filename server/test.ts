import request from 'supertest';
import app from './app';

describe('Testing api endpoints', () => {
  test('get all puppies endpoint', async () => {
    const res = await request(app).get('/api/puppies');
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body).toHaveLength(10);
  });
  test('check for puppy with param.id of 1', async () => {
    const res = await request(app).get('/api/puppies/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      id: 1, breed: 'Bulldog', name: 'Butch', birthdate: '21-06-2022',
    });
  });
  test('delete puppy with id of 1', async () => {
    const res = await request(app).delete('/api/puppies/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual(
      '( id:1  Name:Butch Breed:Bulldog ) deleted from database',
    );
  });
  test('responds with status 404 and message Puppy not found in database', async () => {
    const res = await request(app).get('/api/puppies/50');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Puppy not found in database');
  });
  test('post new puppy', async () => {
    const res = await request(app)
      .post('/api/puppies')
      .send({ breed: 'Greyhound', name: 'Bolt', birthdate: '21-09-2022' });
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual('Bolt');
  });
  test('update puppy name from Dolly', async () => {
    const res = await request(app)
      .put('/api/puppies/10')
      .send({ breed: 'Corgi', name: 'Dolly', birthdate: '24-11-2022' });
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual('Dolly');
  });
  test('400 error when only name added to put request', async () => {
    const res = await request(app)
      .put('/api/puppies/10')
      .send({ name: 'Dolly' });
    expect(res.headers['content-type']).toMatch(/html/);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Puppy breed not provided!');
  });
});

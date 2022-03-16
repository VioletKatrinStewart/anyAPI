const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cat = require('../lib/models/Cat');

describe('anyAPI routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a cat', async () => {
    const expected = {
      name: 'Neko',
      age: 10,
      color: 'grey',
    };
    const res = await request(app).post('/api/v1/cats').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('gets a list of cats', async () => {
    const cat1 = await Cat.insert({
      name: 'Neko',
      age: 10,
      color: 'grey',
    });
    const cat2 = await Cat.insert({
      name: 'Pixie',
      age: 10,
      color: 'grey',
    });
    const res = await request(app).get('/api/v1/cats');

    expect(res.body).toEqual([cat1, cat2]);
  });

  it('gets a cat by id', async () => {
    const cat1 = await Cat.insert({
      name: 'Neko',
      age: 10,
      color: 'grey',
    });
    const res = await request(app).get(`/api/v1/cats/${cat1.id}`);

    expect(res.body).toEqual({ id: expect.any(String), ...cat1 });
  });

  it.only('updates a cat by id', async () => {
    await Cat.insert({
      name: 'Neko',
      age: 10,
      color: 'grey',
    });
    const res = await request(app)
      .patch('/api/v1/cats/1')
      .send({ color: 'pink' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Neko',
      age: 10,
      color: 'pink',
    });
  });

  it('deletes a cat by id', async () => {
    const cat1 = await Cat.insert({
      name: 'Neko',
      age: 10,
      color: 'grey',
    });
    const res = await request(app).delete(`/api/v1/cats/${cat1.id}`);

    expect(res.body).toEqual(cat1);
  });
});

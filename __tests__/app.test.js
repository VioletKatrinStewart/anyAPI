const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
//const Cat = require('../lib/models/Cat');

describe('anyAPI routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a cat', async () => {
    const expected = {
      id: '1',
      name: 'Neko',
      age: 10,
      color: 'grey',
    };
    const res = await request(app).post('/api/v1/cats').send(expected);

    expect(res.body).toEqual(expected);
  });
});

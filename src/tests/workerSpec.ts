import supertest from 'supertest';
import images from '..';

const request = supertest(images);
describe('Test endpoint responseds', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toEqual(200);
  });
});

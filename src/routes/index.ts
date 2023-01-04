import express from 'express';
import images from './api/worker';

const routes: express.Router = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Image Processing API is running...');
});

routes.use('/api/images', images);

export default routes;
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import authMiddleware from './middlewares/auth';

const routes = Router();
const upload = multer(uploadConfig);

//users
routes.post('/users/register', UsersController.create);
routes.post('/users/authenticate', UsersController.authenticate);
routes.use(authMiddleware);
routes.get('/users/me', UsersController.show);
routes.post('/users/:id', UsersController.edit);

//orphanages
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;

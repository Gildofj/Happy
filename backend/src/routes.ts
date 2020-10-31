import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import authMiddleware from './middlewares/auth';

const routes = Router();
const upload = multer(uploadConfig);

//public

// users
routes.post('/users/create', UsersController.create);
routes.post('/users/authenticate', UsersController.authenticate);

// orphanages
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

//private

routes.use(authMiddleware);

//users
routes.get('/users/me', UsersController.show);
routes.post('/users/:id', UsersController.edit);

export default routes;

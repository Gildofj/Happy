import express from 'express';
import path from 'path';
import cors from 'cors';

import routes from './routes';
import 'express-async-errors';
import errorHandler from './errors/handler';

import './database/connection';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(routes);
app.use(errorHandler);

app.listen(4000);

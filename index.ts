import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req: Request, res: Response) => {
  res.sendFile(__dirname + '/views/index.html');
});

import apiRoutes from './routes/api';

app.use('/api', apiRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});

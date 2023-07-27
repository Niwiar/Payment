import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

import apiRoutes from './routes/api';
import hookRoutes from './routes/hook';

app.use('/api', apiRoutes);
app.use('/hook', hookRoutes);

import http from 'http';
import { socketIO, socketServer } from './libs/socket-io';

const server = http.createServer(app);
socketServer(server);
server.listen(process.env.PORT || 3000, () =>
  console.log('Server running on port 3000')
);

socketIO();

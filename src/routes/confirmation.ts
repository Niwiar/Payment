import express, { Router, Request, Response, NextFunction } from 'express';
import { uid } from 'uid';
import axios from 'axios';
import { getAccessToken } from '../middlewares/auth';
import { createQrCode } from '../middlewares/qrPayment';

const router: Router = express.Router();

router.post('/payment', async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.params);
  res.sendStatus(200);
});

export default router;

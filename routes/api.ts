import express, { Router, Request, Response, NextFunction } from 'express';
import { uid } from 'uid';
import axios from 'axios';
import { getAccessToken } from '../middlewares/auth';
import { createQrCode } from '../middlewares/qrPayment';

const router: Router = express.Router();

router.get(
  '/payment',
  getAccessToken,
  createQrCode,
  async (req: Request, res: Response) => {
    console.log(res.locals.qrRawData);
    res.locals.qrRawData
      ? res.json({ qrImage: res.locals.qrImage })
      : res.sendStatus(500);
  }
);

export default router;

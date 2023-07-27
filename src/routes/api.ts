import express, { Router, Request, Response, NextFunction } from 'express';
import { getAccessToken } from '../middlewares/auth';
import { createQrCode } from '../middlewares/qrPayment';
import { encrypt } from '../libs/encrypt';

const router: Router = express.Router();

router.get(
  '/payment',
  getAccessToken,
  createQrCode,
  async (req: Request, res: Response) => {
    res.locals.qrRawData
      ? res.json({
          qrRawData: res.locals.qrRawData,
          qrImage: res.locals.qrImage,
          confirmationRoom: encrypt(res.locals.ref2),
        })
      : res.sendStatus(500);
  }
);

export default router;

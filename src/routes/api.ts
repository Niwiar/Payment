import express, { Router, Request, Response, NextFunction } from 'express';
import { getAccessToken } from '../middlewares/auth';
import { createQrCode } from '../middlewares/qrPayment';
import { encrypt } from '../libs/encrypt';
import logger from '../libs/logger';

const router: Router = express.Router();

router.get(
  '/payment',
  getAccessToken,
  createQrCode,
  async (req: Request, res: Response) => {
    if (!res.locals.qrRawData) return res.sendStatus(500);
    logger.info(`transaction created : ref ${res.locals.ref2}`);
    res.json({
      qrRawData: res.locals.qrRawData,
      qrImage: res.locals.qrImage,
      confirmationRoom: encrypt(res.locals.ref2),
    });
  }
);

export default router;

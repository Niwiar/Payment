import express, { Request, Response, NextFunction } from 'express';
import { uid } from 'uid';
import axios from 'axios';
import { SCB_GEN_QR, SCB_SANDBOX_ROOT } from '../constant';

type QrResponse = {
  status: { code: number; description: string };
  data: {
    qrRawData: string;
    qrImage: string;
  };
};

export const createQrCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ref2 = uid(16).toUpperCase();
    const { data } = await axios<QrResponse>({
      method: 'post',
      url: `${SCB_SANDBOX_ROOT}${SCB_GEN_QR}`,
      headers: {
        'content-Type': 'application/json',
        requestUId: '1b01dff2-b3a3-4567-adde-cd9dd73c8b6d',
        resourceOwnerId: process.env.SCB_API_KEY!,
        Authorization: res.get('authorization'),
      },
      data: {
        qrType: 'PP',
        amount: '1.00',
        ppType: 'BILLERID',
        ppId: process.env.BILLER_ID!,
        ref1: 'PRIVAINNOTECH',
        ref2: ref2,
        ref3: 'WXZ',
      },
    });
    res.locals.qrRawData = data.data.qrRawData;
    res.locals.qrImage = data.data.qrImage;
    res.locals.ref2 = ref2;
    next();
  } catch (err: any) {
    console.log(err);
  }
};

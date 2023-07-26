import express, { Request, Response, NextFunction } from 'express';
import { uid } from 'uid';
import axios from 'axios';

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
    const { data, status, statusText, headers } = await axios<QrResponse>({
      method: 'post',
      url: 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create',
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
        ref2: 'REFERENCE2',
        ref3: 'WXZ',
      },
    });
    res.locals.qrRawData = data.data.qrRawData;
    res.locals.qrImage = data.data.qrImage;
    next();
  } catch (err: any) {
    console.log(err);
  }
};

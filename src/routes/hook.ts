import express, { Router, Request, Response, NextFunction } from 'express';
import { uid } from 'uid';
import { sendSocketToRoom } from '../libs/socket-io';
import { encrypt } from '../libs/encrypt';

const router: Router = express.Router();

router.post('/payment_confirmation', async (req: Request, res: Response) => {
  const { transactionDateandTime, billPaymentRef2 } = req.body;
  const room = encrypt(billPaymentRef2);
  sendSocketToRoom({
    Room: room,
    Key: 'confirmPayment',
    Data: { transactionDateandTime, room },
  });
  res.sendStatus(200);
});

export default router;

// {
//   "payeeProxyId": "992248334149336",
//   "payeeProxyType": "BILLERID",
//   "payeeAccountNumber": "0987654321",
//   "payeeName": "PrivaBilling",
//   "payerProxyId": "6517490001",
//   "payerProxyType": "ACCOUNT",
//   "payerAccountNumber": "6517490001",
//   "payerName": "Susririya Chaigoshum",
//   "sendingBankCode": "014",
//   "receivingBankCode": "014",
//   "amount": "1",
//   "channelCode": "PMH",
//   "transactionId": "202307261Nlm85Q4mCrpihM",
//   "transactionDateandTime": "2023-07-26T17:31:12+07:00",
//   "billPaymentRef1": "PRIVAINNOTECH",
//   "billPaymentRef2": "REFERENCE2",
//   "billPaymentRef3": "WXZ",
//   "currencyCode": "764",
//   "transactionType": "Domestic Transfer"
// }

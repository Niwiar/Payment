"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("../libs/socket-io");
const encrypt_1 = require("../libs/encrypt");
const logger_1 = __importDefault(require("../libs/logger"));
const router = express_1.default.Router();
router.post('/payment_confirmation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.debug(JSON.stringify(req.body));
    const { transactionDateandTime, transactionId, billPaymentRef2 } = req.body;
    logger_1.default.info(`transaction confirm ${transactionId}: ${transactionDateandTime} ref ${billPaymentRef2}`);
    const room = (0, encrypt_1.encrypt)(billPaymentRef2);
    (0, socket_io_1.sendSocketToRoom)({
        Room: room,
        Key: 'confirmPayment',
        Data: { transactionDateandTime, room },
    });
    // sendSocketToServer({
    //   Key: 'confirmPayment',
    //   Data: { transactionDateandTime, room },
    // });
    res.json({ resCode: '00', resDesc: 'success', transactionId: transactionId });
}));
exports.default = router;
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
//# sourceMappingURL=hook.js.map
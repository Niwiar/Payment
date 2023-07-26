"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQrCode = void 0;
const axios_1 = __importDefault(require("axios"));
const constant_1 = require("../constant");
const createQrCode = async (req, res, next) => {
    try {
        const { data } = await (0, axios_1.default)({
            method: 'post',
            url: `${constant_1.SCB_SANDBOX_ROOT}${constant_1.SCB_GEN_QR}`,
            headers: {
                'content-Type': 'application/json',
                requestUId: '1b01dff2-b3a3-4567-adde-cd9dd73c8b6d',
                resourceOwnerId: process.env.SCB_API_KEY,
                Authorization: res.get('authorization'),
            },
            data: {
                qrType: 'PP',
                amount: '1.00',
                ppType: 'BILLERID',
                ppId: process.env.BILLER_ID,
                ref1: 'PRIVAINNOTECH',
                ref2: 'REFERENCE2',
                ref3: 'WXZ',
            },
        });
        res.locals.qrRawData = data.data.qrRawData;
        res.locals.qrImage = data.data.qrImage;
        next();
    }
    catch (err) {
        console.log(err);
    }
};
exports.createQrCode = createQrCode;

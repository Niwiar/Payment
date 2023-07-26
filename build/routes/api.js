"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const qrPayment_1 = require("../middlewares/qrPayment");
const router = express_1.default.Router();
router.get('/payment', auth_1.getAccessToken, qrPayment_1.createQrCode, async (req, res) => {
    console.log(res.locals.qrRawData);
    res.locals.qrRawData
        ? res.json({ qrImage: res.locals.qrImage })
        : res.sendStatus(500);
});
exports.default = router;

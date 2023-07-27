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
const auth_1 = require("../middlewares/auth");
const qrPayment_1 = require("../middlewares/qrPayment");
const encrypt_1 = require("../libs/encrypt");
const logger_1 = __importDefault(require("../libs/logger"));
const router = express_1.default.Router();
router.get('/payment', auth_1.getAccessToken, qrPayment_1.createQrCode, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.qrRawData)
        return res.sendStatus(500);
    logger_1.default.info(`transaction created : ref ${res.locals.ref2}`);
    res.json({
        qrRawData: res.locals.qrRawData,
        qrImage: res.locals.qrImage,
        confirmationRoom: (0, encrypt_1.encrypt)(res.locals.ref2),
    });
}));
exports.default = router;
//# sourceMappingURL=api.js.map
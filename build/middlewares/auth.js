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
exports.getAccessToken = void 0;
const uid_1 = require("uid");
const axios_1 = __importDefault(require("axios"));
const constant_1 = require("../constant");
const getAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, axios_1.default)({
        method: 'post',
        url: `${constant_1.SCB_SANDBOX_ROOT}${constant_1.SCB_GEN_TOKEN}`,
        headers: {
            'Content-Type': 'application/json',
            'accept-language': 'en',
            requestUId: (0, uid_1.uid)(16),
            resourceOwnerId: process.env.SCB_API_KEY,
        },
        data: {
            applicationKey: process.env.SCB_API_KEY,
            applicationSecret: process.env.SCB_API_SECRET,
        },
    });
    const { accessToken, tokenType } = response.data.data;
    res.set('authorization', `${tokenType} ${accessToken}`);
    next();
});
exports.getAccessToken = getAccessToken;
//# sourceMappingURL=auth.js.map
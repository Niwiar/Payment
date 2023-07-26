"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = void 0;
const uid_1 = require("uid");
const axios_1 = __importDefault(require("axios"));
const constant_1 = require("../constant");
const getAccessToken = async (req, res, next) => {
    const response = await (0, axios_1.default)({
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
};
exports.getAccessToken = getAccessToken;

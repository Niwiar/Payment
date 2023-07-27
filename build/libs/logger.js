"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const { combine, colorize, timestamp, printf } = winston_1.format;
const MODE = process.env.MODE || 'development';
const LEVEL = MODE === 'development' ? 'debug' : 'info';
const logDir = 'logs';
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir);
}
const paymentLogFile = path_1.default.join(logDir, 'payment.log');
const logger = (0, winston_1.createLogger)({
    level: LEVEL,
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), printf((info) => {
        let { timestamp, level, message } = info;
        return `${timestamp} ${level}: ${message}`;
    })),
    transports: [
        new winston_1.transports.Console({
            level: 'debug',
            format: combine(colorize(), printf((info) => {
                let { timestamp, level, message } = info;
                return `${timestamp} ${level}: ${message}`;
            })),
        }),
        new winston_1.transports.File({ filename: paymentLogFile }),
    ],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map
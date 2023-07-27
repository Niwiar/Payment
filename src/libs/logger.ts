import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';

const { combine, colorize, timestamp, printf } = format;

const MODE = process.env.MODE || 'development';
const LEVEL = MODE === 'development' ? 'debug' : 'info';
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const paymentLogFile = path.join(logDir, 'payment.log');

const logger = createLogger({
  level: LEVEL,
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf((info) => {
      let { timestamp, level, message } = info;
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      format: combine(
        colorize(),
        printf((info) => {
          let { timestamp, level, message } = info;
          return `${timestamp} ${level}: ${message}`;
        })
      ),
    }),
    new transports.File({ filename: paymentLogFile }),
  ],
});

export default logger;

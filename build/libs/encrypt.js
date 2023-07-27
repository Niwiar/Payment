"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const encrypt = (data) => Buffer.from(data).toString('base64');
exports.encrypt = encrypt;
const decrypt = (data) => Buffer.from(data, 'base64').toString('ascii');
exports.decrypt = decrypt;
//# sourceMappingURL=encrypt.js.map
"use strict";
const generateQr = require('promptpay-qr');
const qrcode = require('qrcode');
const fs = require('fs');
const crc = require('crc');
const mobileNumber = '081-443-9455';
const amount = 100;
const payload = generateQr(mobileNumber, { amount });
console.log(payload);
const option = { type: 'svg', color: { dark: '#000', light: '#fff' } };
qrcode.toString(payload, option, (err, svg) => {
    if (err)
        return console.log(err);
    fs.writeFileSync('qrcode.svg', svg);
});
console.log(crc
    .crc16xmodem('00020101021129390016A000000677010111031500499901223315053037645802TH5406100.006304', 0xffff)
    .toString(16)
    .toUpperCase());
const kbank = '00020101021129390016A000000677010111031500499901223315053037645802TH5406100.006304D086';
const genwithprice = '00020101021229370016A000000677010111011300668144394555802TH53037645406100.006304840F';
const gen = '00020101021129370016A000000677010111011300668144394555802TH530376463044BFC';
const scbwithprice = '00020101021153037645802TH29370016A000000677010111011300668144394555406474.006304BCB3';
const scb = '00020101021153037645802TH29370016A000000677010111011300668144394556304A113';
qrcode.toString(kbank, option, (err, svg) => {
    if (err)
        return console.log(err);
    fs.writeFileSync('qrcode-kbank.svg', svg);
});
// 000201 = field 00 length 02 code 01
// 010211 = field 01 length 02 code 11 : 11 for multi & 12 for single
// 29370016A00000067701011101130066814439455 = field 29 length 37 split code in 2 group
// - 0016A000000677010111 = field 00 length 16 code A000000677010111 : AppId (A000000677010111 = Promptpay AID)
// - 01130066814439455 = field 01 length 13 code 0066814439455 : Tel 0814439455
// ---- for field 01 = Tel
// ---- for field 02 = Citizen ID
// ---- for field 03 = E-Wallet ID
// 5802TH = field 58 length 02 code TH : Country Code (TH = Thai)
// 5303764 = field 53 length 03 code 764 : Currency Code ISO4217 (764 = THB)
// 5406474.00 = field 54 length 06 code 474.00 : Amount (474.00 Bht)
// 6304E8F3 = field 63 length 04 code E8F3 : Checksum (CRC-16-XMODEM with initial 0xFFFF)
const scbqr = '000201010212305001159922483341493360213PRIVAINNOTECH0310REFERENCE252047011530376454041.005802TH5913PrivaMerchant6007BANGKOK62340523202307260418432500000000703WXZ630475C9';
//# sourceMappingURL=promptpay.js.map
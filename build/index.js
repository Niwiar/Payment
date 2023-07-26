"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', async (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'views/index.html'));
});
const api_1 = __importDefault(require("./routes/api"));
app.use('/api', api_1.default);
app.use('/confirmation', api_1.default);
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
});

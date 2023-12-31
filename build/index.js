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
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, 'assets')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendFile(path_1.default.join(__dirname, 'views/index.html'));
}));
const api_1 = __importDefault(require("./routes/api"));
const hook_1 = __importDefault(require("./routes/hook"));
app.use('/api', api_1.default);
app.use('/hook', hook_1.default);
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("./libs/socket-io");
const server = http_1.default.createServer(app);
(0, socket_io_1.socketServer)(server);
server.listen(process.env.PORT || 3000, () => console.log('Server running on port 3000'));
(0, socket_io_1.socketIO)();
//# sourceMappingURL=index.js.map
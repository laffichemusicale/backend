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
exports.RegistrationToken = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const ErrorHandler_1 = require("./middleware/ErrorHandler");
const ValidatorHandler_1 = __importDefault(require("./middleware/ValidatorHandler"));
const database_source_1 = require("./database/database-source");
const config_1 = require("./config/config");
exports.RegistrationToken = ["Laffichemusicale2023"];
database_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Database connection success");
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        origin: ['https://laffichemusicale.wailroth.fr', 'http://localhost:3000',],
        credentials: true
    }));
    //app.use(authHandler);
    app.use(ValidatorHandler_1.default);
    (0, routes_1.routes)(app);
    app.use(ErrorHandler_1.errorHandler);
    app.listen(config_1.envConfig.BACKEND_PORT, () => {
        console.log('Listening to port 8000');
    });
}))
    .catch((err) => {
    throw err;
});

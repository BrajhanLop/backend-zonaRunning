"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const routes_1 = require("./routes");
// Esta es nuestra aplicación
exports.app = (0, express_1.default)();
// Middlewares
exports.app.use(express_1.default.json());
exports.app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
exports.app.use((0, cors_1.default)());
exports.app.use("/", routes_1.globalRouter);

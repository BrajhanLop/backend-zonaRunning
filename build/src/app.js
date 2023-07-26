"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const path_1 = __importDefault(require("path"));
//esta es nuestra aplicacion
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use((0, helmet_1.default)({
    crossOriginEmbedderPolicy: false
}));
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api/v1', routes_1.default);
app.get("/", (_req, res) => {
    return res.send("Welcome to express");
});
//Middlewares despues de las rutas
app.use(errorHandler_1.default);
exports.default = app;

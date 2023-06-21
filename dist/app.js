"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = require("express");
const helmet_1 = require("helmet");
const cors_1 = require("cors");
require("dotenv/config");
const index_ts_1 = require("./routes/index.ts");
// Esta es nuestra aplicación
exports.app = (0, express_1.default)();
// Middlewares
exports.app.use(express_1.default.json());
exports.app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
exports.app.use((0, cors_1.default)());
exports.app.use("/", index_ts_1.globalRouter);

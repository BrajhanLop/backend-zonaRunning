"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalRouter = void 0;
const express_1 = require("express");
exports.globalRouter = (0, express_1.Router)();
// colocar las rutas aquí
exports.globalRouter.get('/', (req, res) => {
    res.send("Welcome to express");
});

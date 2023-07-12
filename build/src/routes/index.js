"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = require("./user.router");
const service_router_1 = require("./service.router");
const professionals_router_1 = require("./professionals.router");
const globalRouter = (0, express_1.Router)();
//rutas
globalRouter.use('/professionals', professionals_router_1.routerProfessionals);
globalRouter.use("/users", user_router_1.routerUser);
globalRouter.use("/services", service_router_1.routerService);
exports.default = globalRouter;

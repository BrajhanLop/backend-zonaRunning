"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAvatar = void 0;
const avatar_controllers_1 = require("../controllers/avatar.controllers");
const express_1 = require("express");
exports.routerAvatar = (0, express_1.Router)();
exports.routerAvatar.route('/')
    .get(avatar_controllers_1.getAll)
    .post(avatar_controllers_1.create);
exports.routerAvatar.route('/:id')
    .delete(avatar_controllers_1.remove);
//# sourceMappingURL=avatar.router.js.map
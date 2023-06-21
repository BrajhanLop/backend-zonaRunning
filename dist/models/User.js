"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const UserSchema = new mongoose_1.Schema({
    firstName: {},
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    img: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    isVerified: { type: Boolean, default: false }
});
exports.default = mongoose_1.default.model('User', UserSchema);

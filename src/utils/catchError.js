"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function catchError(controller) {
    return (req, res, next) => {
        controller(req, res, next).catch(next);
    };
}
exports.default = catchError;

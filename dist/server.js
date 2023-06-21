"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const PORT = process.env.PORT || 8080;
app_js_1.app.listen(PORT);
console.log(`Server running on port ${PORT}`);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminRoute = (0, express_1.Router)();
adminRoute.get("/", (req, res) => { return res.json(["ok"]); });
exports.default = adminRoute;

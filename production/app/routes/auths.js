"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthControllers_1 = __importDefault(require("../controllers/AuthControllers"));
const authRoute = (0, express_1.Router)();
const auth = new AuthControllers_1.default();
authRoute.get("/login/client", auth.clientLogin);
authRoute.get("/login/employee", auth.employeeLogin);
authRoute.get("/login/enterprise", auth.enterpriseLogin);
exports.default = authRoute;

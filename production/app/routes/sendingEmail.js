"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SendingMailControllers_1 = __importDefault(require("../controllers/SendingMailControllers"));
const sendEmailRoute = (0, express_1.Router)();
const sendEmail = new SendingMailControllers_1.default();
sendEmailRoute.get("/password/reset", sendEmail.resetPasswordPartOne);
exports.default = sendEmailRoute;

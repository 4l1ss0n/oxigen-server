"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = __importDefault(require("./admin"));
const auths_1 = __importDefault(require("./auths"));
const clients_1 = __importDefault(require("./clients"));
const employees_1 = __importDefault(require("./employees"));
const enterprises_1 = __importDefault(require("./enterprises"));
const products_1 = __importDefault(require("./products"));
const supliers_1 = __importDefault(require("./supliers"));
const sendingEmail_1 = __importDefault(require("./sendingEmail"));
const routes = (0, express_1.Router)();
routes.use([
    admin_1.default,
    auths_1.default,
    clients_1.default,
    employees_1.default,
    enterprises_1.default,
    products_1.default,
    supliers_1.default,
    sendingEmail_1.default
]);
exports.default = routes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClientsControllers_1 = __importDefault(require("../controllers/ClientsControllers"));
const tokenAuthentication_1 = __importDefault(require("../middleware/tokenAuthentication"));
const clientRoute = (0, express_1.Router)();
const clients = new ClientsControllers_1.default();
clientRoute.get("/clients", clients.index);
clientRoute.get("/client/:id", clients.show);
clientRoute.post("/client/create", clients.store);
clientRoute.put("/client/update/:id", tokenAuthentication_1.default, clients.update);
clientRoute.delete("/client/delete/:id", tokenAuthentication_1.default, clients.delete);
exports.default = clientRoute;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SupliersControllers_1 = __importDefault(require("../controllers/SupliersControllers"));
const tokenAuthentication_1 = __importDefault(require("../middleware/tokenAuthentication"));
const suplierRoute = (0, express_1.Router)();
const supliers = new SupliersControllers_1.default();
suplierRoute.get("/supliers", supliers.index);
suplierRoute.get("/suplier/:id", supliers.show);
suplierRoute.post("/suplier/create", tokenAuthentication_1.default, supliers.store);
suplierRoute.put("/suplier/update/:id", tokenAuthentication_1.default, supliers.update);
suplierRoute.delete("/suplier/delete/:id", tokenAuthentication_1.default, supliers.delete);
exports.default = suplierRoute;

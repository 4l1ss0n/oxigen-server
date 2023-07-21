"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EnterpriseControllers_1 = __importDefault(require("../controllers/EnterpriseControllers"));
const tokenAuthentication_1 = __importDefault(require("../middleware/tokenAuthentication"));
const enterpriseRoute = (0, express_1.Router)();
const enterprise = new EnterpriseControllers_1.default();
enterpriseRoute.get("/enterprises", enterprise.index);
enterpriseRoute.get("/enterprise/:id", enterprise.show);
enterpriseRoute.post("/enterprise/create", tokenAuthentication_1.default, enterprise.store);
enterpriseRoute.put("/enterprise/update/:id", tokenAuthentication_1.default, enterprise.update);
enterpriseRoute.delete("/enterprise/delete/:id", tokenAuthentication_1.default, enterprise.delete);
exports.default = enterpriseRoute;

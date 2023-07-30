"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmployeesControllers_1 = __importDefault(require("../controllers/EmployeesControllers"));
const tokenAuthentication_1 = __importDefault(require("../middleware/tokenAuthentication"));
const employeeRoute = (0, express_1.Router)();
const employees = new EmployeesControllers_1.default();
employeeRoute.get("/employees", employees.index);
employeeRoute.get("/employee/:id", employees.show);
employeeRoute.post("/employee/create", tokenAuthentication_1.default, employees.store);
employeeRoute.put("/employee/update/:id", tokenAuthentication_1.default, employees.update);
employeeRoute.delete("/employee/delete/:id", tokenAuthentication_1.default, employees.delete);
exports.default = employeeRoute;

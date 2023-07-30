"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsControllers_1 = __importDefault(require("../controllers/ProductsControllers"));
const tokenAuthentication_1 = __importDefault(require("../middleware/tokenAuthentication"));
const productRoute = (0, express_1.Router)();
const products = new ProductsControllers_1.default();
productRoute.get("/products", products.index);
productRoute.get("/product/:id", products.show);
productRoute.post("/product/create", tokenAuthentication_1.default, products.store);
productRoute.put("/product/update/:id", tokenAuthentication_1.default, products.update);
productRoute.delete("/product/delete/:id", tokenAuthentication_1.default, products.delete);
exports.default = productRoute;

import { Router } from "express";
import ProductsControllers from "../controllers/ProductsControllers";


const productRoute = Router();

const products = new ProductsControllers();

productRoute.get("/products", products.index);
productRoute.get("/product/:id", products.show);
productRoute.post("/product/create", products.store);
productRoute.put("/product/update/:id", products.update);
productRoute.delete("/product/delete/:id", products.delete);

export default productRoute;
import { Router } from "express";
import ProductsControllers from "../controllers/ProductsControllers";
import tokenAuthentication from "../middleware/tokenAuthentication";


const productRoute = Router();

const products = new ProductsControllers();

productRoute.get("/products", products.index);
productRoute.get("/product/:id", products.show);
productRoute.post("/product/create", tokenAuthentication, products.store);
productRoute.put("/product/update/:id", tokenAuthentication, products.update);
productRoute.delete("/product/delete/:id", tokenAuthentication, products.delete);

export default productRoute;
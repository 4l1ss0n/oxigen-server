import { Router, response } from "express";

import ClientsControllers from "./controllers/ClientsControllers";
import EnterpriseControllers from "./controllers/EnterpriseControllers";
import ProductsControllers from "./controllers/ProductsControllers";
import SupliersControllers from "./controllers/SupliersControllers";
import EmployeesControllers from "./controllers/EmployeesControllers";



const routes = Router();
const clients = new ClientsControllers();
const enterprise = new EnterpriseControllers();
const products = new ProductsControllers();
const supliers = new SupliersControllers();
const employees = new EmployeesControllers();

routes.get("/", (req, res) => {return res.json(["ok"])});

routes.get("/clients", clients.index);
routes.get("/client/:id", clients.show);
routes.post("/client/create", clients.store);
routes.put("/client/update/:id", clients.update);
routes.delete("/client/delete/:id", clients.delete);

routes.get("/enterprises", enterprise.index);
routes.get("/enterprise/:id", enterprise.show);
routes.post("/enterprise/create", enterprise.store);
routes.put("/enterprise/update/:id", enterprise.update);
routes.delete("/enterprise/delete/:id", enterprise.delete);

routes.get("/products", products.index);
routes.get("/product/:id", products.show);
routes.post("/product/create", products.store);
routes.put("/product/update/:id", products.update);
routes.delete("/product/delete/:id", products.delete);

routes.get("/supliers", supliers.index);
routes.get("/suplier/:id", supliers.show);
routes.post("/suplier/create", supliers.store);
routes.put("/suplier/update/:id", supliers.update);
routes.delete("/suplier/delete/:id", supliers.delete);

routes.get("/employees", employees.index);
routes.get("/employee/:id", employees.show);
routes.post("/employee/create", employees.store);
routes.put("/employee/update/:id", employees.update);
routes.delete("/employee/delete/:id", employees.delete);

export default routes;
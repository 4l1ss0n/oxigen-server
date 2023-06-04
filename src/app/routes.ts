import { Router, response } from "express";

import ClientsControllers from "./controllers/ClientsControllers";
import EnterpriseControllers from "./controllers/EnterpriseControllers";


const routes = Router();
const clients = new ClientsControllers();
const enterprise = new EnterpriseControllers();

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

export default routes;
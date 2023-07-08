import { Router } from "express";
import ClientsControllers from "../controllers/ClientsControllers";


const clientRoute = Router();

const clients = new ClientsControllers();

clientRoute.get("/clients", clients.index);
clientRoute.get("/client/:id", clients.show);
clientRoute.post("/client/create", clients.store);
clientRoute.put("/client/update/:id", clients.update);
clientRoute.delete("/client/delete/:id", clients.delete);


export default clientRoute;
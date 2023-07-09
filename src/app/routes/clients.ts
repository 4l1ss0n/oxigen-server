import { Router } from "express";
import ClientsControllers from "../controllers/ClientsControllers";
import tokenAuthentication from "../middleware/tokenAuthentication";


const clientRoute = Router();

const clients = new ClientsControllers();

clientRoute.get("/clients", clients.index);
clientRoute.get("/client/:id", clients.show);
clientRoute.post("/client/create", clients.store);
clientRoute.put("/client/update/:id", tokenAuthentication, clients.update);
clientRoute.delete("/client/delete/:id", tokenAuthentication, clients.delete);


export default clientRoute;
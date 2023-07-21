import { Router } from "express";
import SupliersControllers from "../controllers/SupliersControllers";
import tokenAuthentication from "../middleware/tokenAuthentication";


const suplierRoute = Router();

const supliers = new SupliersControllers();


suplierRoute.get("/supliers", supliers.index);
suplierRoute.get("/suplier/:id", supliers.show);
suplierRoute.post("/suplier/create", tokenAuthentication, supliers.store);
suplierRoute.put("/suplier/update/:id", tokenAuthentication, supliers.update);
suplierRoute.delete("/suplier/delete/:id", tokenAuthentication, supliers.delete);

export default suplierRoute;
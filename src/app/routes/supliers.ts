import { Router } from "express";
import SupliersControllers from "../controllers/SupliersControllers";


const suplierRoute = Router();

const supliers = new SupliersControllers();


suplierRoute.get("/supliers", supliers.index);
suplierRoute.get("/suplier/:id", supliers.show);
suplierRoute.post("/suplier/create", supliers.store);
suplierRoute.put("/suplier/update/:id", supliers.update);
suplierRoute.delete("/suplier/delete/:id", supliers.delete);

export default suplierRoute;
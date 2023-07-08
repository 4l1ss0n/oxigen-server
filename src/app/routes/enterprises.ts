import { Router } from "express";
import EnterpriseControllers from "../controllers/EnterpriseControllers";


const enterpriseRoute = Router();

const enterprise = new EnterpriseControllers();

enterpriseRoute.get("/enterprises", enterprise.index);
enterpriseRoute.get("/enterprise/:id", enterprise.show);
enterpriseRoute.post("/enterprise/create", enterprise.store);
enterpriseRoute.put("/enterprise/update/:id", enterprise.update);
enterpriseRoute.delete("/enterprise/delete/:id", enterprise.delete);

export default enterpriseRoute;
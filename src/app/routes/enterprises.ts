import { Router } from "express";
import EnterpriseControllers from "../controllers/EnterpriseControllers";
import tokenAuthentication from "../middleware/tokenAuthentication";


const enterpriseRoute = Router();

const enterprise = new EnterpriseControllers();

enterpriseRoute.get("/enterprises", enterprise.index);
enterpriseRoute.get("/enterprise/:id", enterprise.show);
enterpriseRoute.post("/enterprise/create", tokenAuthentication, enterprise.store);
enterpriseRoute.put("/enterprise/update/:id", tokenAuthentication, enterprise.update);
enterpriseRoute.delete("/enterprise/delete/:id", tokenAuthentication, enterprise.delete);

export default enterpriseRoute;
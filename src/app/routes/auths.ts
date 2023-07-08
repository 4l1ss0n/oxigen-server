import { Router } from "express";
import AuthControllers from "../controllers/AuthControllers";


const authRoute = Router();

const auth = new AuthControllers();

authRoute.get("/login/client", auth.clientLogin);
authRoute.get("/login/employee", auth.employeeLogin);
authRoute.get("/login/enterprise", auth.enterpriseLogin);

export default authRoute;
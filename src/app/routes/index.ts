import { Router } from "express";

import adminRoute from "./admin";
import authRoute from "./auths";
import clientRoute from "./clients";
import employeeRoute from "./employees";
import enterpriseRoute from "./enterprises";
import productRoute from "./products";
import suplierRoute from "./supliers";
import sendEmailRoute from "./sendingEmail";

const routes = Router();

routes.use([
    adminRoute,
    authRoute,
    clientRoute,
    employeeRoute,
    enterpriseRoute,
    productRoute,
    suplierRoute,
    sendEmailRoute
])

export default routes;
import { Router } from "express";
import SendingMailControllers from "../controllers/SendingMailControllers";


const sendEmailRoute = Router();

const sendEmail = new SendingMailControllers();

sendEmailRoute.get("/password/reset", sendEmail.resetPasswordPartOne);

export default sendEmailRoute;
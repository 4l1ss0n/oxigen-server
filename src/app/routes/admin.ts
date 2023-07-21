import { Router } from "express";


const adminRoute = Router();

adminRoute.get("/", (req, res) => {return res.json(["ok"])});

export default adminRoute;
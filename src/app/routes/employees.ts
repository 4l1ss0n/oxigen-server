import { Router } from "express";
import EmployeesControllers from "../controllers/EmployeesControllers";
import tokenAuthentication from "../middleware/tokenAuthentication";


const employeeRoute = Router();

const employees = new EmployeesControllers();

employeeRoute.get("/employees", employees.index);
employeeRoute.get("/employee/:id", employees.show);
employeeRoute.post("/employee/create", tokenAuthentication, employees.store);
employeeRoute.put("/employee/update/:id", tokenAuthentication, employees.update);
employeeRoute.delete("/employee/delete/:id", tokenAuthentication, employees.delete);

export default employeeRoute;
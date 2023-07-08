import { Router } from "express";
import EmployeesControllers from "../controllers/EmployeesControllers";


const employeeRoute = Router();

const employees = new EmployeesControllers();

employeeRoute.get("/employees", employees.index);
employeeRoute.get("/employee/:id", employees.show);
employeeRoute.post("/employee/create", employees.store);
employeeRoute.put("/employee/update/:id", employees.update);
employeeRoute.delete("/employee/delete/:id", employees.delete);

export default employeeRoute;
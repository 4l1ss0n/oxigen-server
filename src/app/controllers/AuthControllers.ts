import { Request as Req, Response as Res } from "express";
import { database } from "../../database/src";
import bcrypt from "bcrypt";
import tokenGen from "../middleware/tokenGen";


class AuthControllers {
    async clientLogin(req: Req, res: Res): Promise<Res<any>> {
        const credentials = req.headers.authorization;
        try {
            if (!credentials) return res.status(401).json({err: "creadentials not found"});
            const [,authHash] = credentials.split(" ");

            const [email, password] = Buffer.from(authHash, "base64").toString().split(":");

            const client = await database.clients.findUnique({
                where: {email}
            });

            if (!client) return res.status(404).json({err: "register not found with this Email"});
            if(!(bcrypt.compareSync(password, client.pswhs))) return res.status(401).json({err: "incorrect password"});


            return res.status(200).json({
                logged: true,
                token: tokenGen({
                    id: client.id,
                    tokenType: "client"
                }, "2h")
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({logged: false});
            
        }
    };
    async enterpriseLogin(req: Req, res: Res): Promise<Res<any>> {
        const credentials = req.headers.authorization;
        try {
            if (!credentials) return res.status(401).json({err: "creadentials not found"});
            const [,authHash] = credentials.split(" ");

            const [email, password] = Buffer.from(authHash, "base64").toString().split(":");

            const enterprise = await database.enterprises.findUnique({
                where: {corporationEmail: email}
            });

            if (!enterprise) return res.status(404).json({err: "register not found with this Email"});
            if(!(bcrypt.compareSync(password, enterprise.accessKey))) return res.status(401).json({err: "incorrect password"});


            return res.status(200).json({
                logged: true,
                token: tokenGen({
                    id: enterprise.id,
                    tokenType: "enterprise"
                }, "2h")
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({logged: false});
            
        }
    };
    async employeeLogin(req: Req, res: Res): Promise<Res<any>> {
        const credentials = req.headers.authorization;
        try {
            if (!credentials) return res.status(401).json({err: "creadentials not found"});
            const [,authHash] = credentials.split(" ");

            const [email, password] = Buffer.from(authHash, "base64").toString().split(":");

            const employee = await database.employees.findUnique({
                where: {email}
            });

            if (!employee) return res.status(404).json({err: "register not found with this Email"});
            if(!(bcrypt.compareSync(password, employee.pswhs))) return res.status(401).json({err: "incorrect password"});


            return res.status(200).json({
                logged: true,
                token: tokenGen({
                    id: employee.id,
                    tokenType: "employee"
                }, "2h")
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({logged: false});
            
        }
    };
}

export default AuthControllers;
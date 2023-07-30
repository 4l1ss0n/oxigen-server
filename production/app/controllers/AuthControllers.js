"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../database/src");
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenGen_1 = __importDefault(require("../middleware/tokenGen"));
class AuthControllers {
    async clientLogin(req, res) {
        const credentials = req.headers.authorization;
        try {
            if (!credentials)
                return res.status(401).json({ err: "creadentials not found" });
            const [, authHash] = credentials.split(" ");
            const [email, password] = Buffer.from(authHash, "base64").toString().split(":");
            const client = await src_1.database.clients.findUnique({
                where: { email }
            });
            if (!client)
                return res.status(404).json({ err: "register not found with this Email" });
            if (!(bcrypt_1.default.compareSync(password, client.pswhs)))
                return res.status(401).json({ err: "incorrect password" });
            return res.status(200).json({
                logged: true,
                token: (0, tokenGen_1.default)({
                    id: client.id,
                    tokenType: "client"
                }, "2h")
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ logged: false });
        }
    }
    ;
    async enterpriseLogin(req, res) {
        const credentials = req.headers.authorization;
        try {
            if (!credentials)
                return res.status(401).json({ err: "creadentials not found" });
            const [, authHash] = credentials.split(" ");
            const [email, password] = Buffer.from(authHash, "base64").toString().split(":");
            const enterprise = await src_1.database.enterprises.findUnique({
                where: { corporationEmail: email }
            });
            if (!enterprise)
                return res.status(404).json({ err: "register not found with this Email" });
            if (!(bcrypt_1.default.compareSync(password, enterprise.accessKey)))
                return res.status(401).json({ err: "incorrect password" });
            return res.status(200).json({
                logged: true,
                token: (0, tokenGen_1.default)({
                    id: enterprise.id,
                    tokenType: "enterprise"
                }, "2h")
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ logged: false });
        }
    }
    ;
    async employeeLogin(req, res) {
        const credentials = req.headers.authorization;
        try {
            if (!credentials)
                return res.status(401).json({ err: "creadentials not found" });
            const [, authHash] = credentials.split(" ");
            const [email, password] = Buffer.from(authHash, "base64").toString().split(":");
            const employee = await src_1.database.employees.findUnique({
                where: { email }
            });
            if (!employee)
                return res.status(404).json({ err: "register not found with this Email" });
            if (!(bcrypt_1.default.compareSync(password, employee.pswhs)))
                return res.status(401).json({ err: "incorrect password" });
            return res.status(200).json({
                logged: true,
                token: (0, tokenGen_1.default)({
                    id: employee.id,
                    tokenType: "employee"
                }, "2h")
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ logged: false });
        }
    }
    ;
}
exports.default = AuthControllers;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../database/src");
const NodemaillerConfig_1 = __importDefault(require("../utils/NodemaillerConfig"));
class SendingMailControllers {
    async resetPasswordPartOne(req, res) {
        const auth = req.headers.authorization;
        try {
            if (!auth)
                return res.status(401).json({ err: "creadentials not found" });
            const [, authHash] = auth.split(" ");
            const [email,] = Buffer.from(authHash, "base64").toString().split(":");
            const returnRequest = await Promise.all([
                src_1.database.clients.findUnique({ where: { email } }),
                src_1.database.employees.findUnique({ where: { email } }),
                src_1.database.enterprises.findUnique({
                    where: {
                        corporationEmail: email
                    }
                })
            ]);
            returnRequest.forEach(async (db) => {
                if (db) {
                    await (0, NodemaillerConfig_1.default)({
                        from: "server@alisson.tech.com",
                        to: db.email || db.corporationEmail,
                        htmlName: "forgotPasswordEmail",
                        subject: "Reset your password"
                    });
                }
            });
            return res.status(200).json({
                emailSended: true
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                emailSended: false
            });
        }
    }
}
exports.default = SendingMailControllers;

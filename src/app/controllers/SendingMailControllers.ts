import { Request as Req, Response as Res } from "express";
import { database } from "../../database/src";
import NodemaillerConfig from "../utils/NodemaillerConfig";

class SendingMailControllers {
    async resetPasswordPartOne(req: Req, res: Res): Promise<Res<any>> {
        const auth = req.headers.authorization;
        try {
            if (!auth) return res.status(401).json({err: "creadentials not found"});
            const [,authHash] = auth.split(" ");

            const [email,] = Buffer.from(authHash, "base64").toString().split(":");

            const returnRequest = await Promise.all([
                database.clients.findUnique({where:{email}}),
                database.employees.findUnique({where:{email}}),
                database.enterprises.findUnique({
                    where: {
                        corporationEmail: email
                    }
                })
            ]);
            returnRequest.forEach(async (db: any) => {
                if (db){
                    await NodemaillerConfig({
                        from: "server@alisson.tech.com",
                        to: db.email || db.corporationEmail,
                        htmlName: "forgotPasswordEmail",
                        subject: "Reset your password"
                    })
                }
            })
            

            return res.status(200).json({
                emailSended: true
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                emailSended: false
            });
        }
    }
}

export default SendingMailControllers;
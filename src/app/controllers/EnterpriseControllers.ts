import { Request as Req, Response as Res } from "express";
import { database } from "../../database/src";
import bcrypt from "bcrypt";

class EnterpriseControllers {
    async index(req: Req, res: Res): Promise<Res<any>> {
        try {
            const enterprise = database.enterprises.findMany();
            return res.json({data: [
                enterprise
            ]});
        } catch (err) {
            return res.status(500).json({ok: true});
        }
    };
    async show(req: Req, res: Res): Promise<Res<any>> {
        const {id} = req.params;
        try {
            const enterprise = await database.enterprises.findUnique({
                where: {
                    id,
                }
            })
            if (!enterprise) return res.status(404).json({err: "enterprise not found"});
            return res.json({ok: true});
        } catch (err) {
            return res.status(500).json({ok: true});
        }
    };
    async store(req: Req, res: Res): Promise<Res<any>> {
        const {
            cnpj,
            fantasyName,
            name,
            corporationEmail,
            password
        } = req.body;
        try {
            await database.enterprises.create({
                data: {
                    cnpj,
                    corparationEmail: corporationEmail,
                    fantasyName,
                    name,
                    size:2,
                    activeClients:{},
                    convenios: {},
                    accessKey: await bcrypt.hash(password, 2)
                }
            })
            return res.json({ok: true});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ok: true});
        }
    };
    async update(req: Req, res: Res): Promise<Res<any>> {
        try {
            return res.json({ok: true});
        } catch (err) {
            return res.status(500).json({ok: true});
        }
    };
    async delete(req: Req, res: Res): Promise<Res<any>> {
        try {
            return res.json({ok: true});
        } catch (err) {
            return res.status(500).json({ok: true});
        }
    };
}

export default EnterpriseControllers;
import { Request as Req, Response as Res } from "express";
import { database } from "../../database/src";
import bcrypt from "bcrypt";

class EnterpriseControllers {
    async index(req: Req, res: Res): Promise<Res<any>> {
        try {
            const enterprise = await database.enterprises.findMany({
                select: {
                    id: true,
                    name: true,
                    _count: true
                }
                
            });
            return res.json({data: enterprise});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ok: false});
        }
    };
    async show(req: Req, res: Res): Promise<Res<any>> {
        const {id} = req.params;
        try {
            const enterprise = await database.enterprises.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    name: true,
                    fantasyName: true,
                    corporationEmail: true,
                    size: true,
                    cnpj: true,
                    _count: true
                }
            })
            if (!enterprise) return res.status(404).json({err: "enterprise not found"});
            return res.json({data: enterprise});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ok: false});
        }
    };
    async store(req: Req, res: Res): Promise<Res<any>> {
        const {
            cnpj,
            fantasyName,
            name,
            corporationEmail,
            password,
            size
        } = req.body;
        try {
            const enterprise = await database.enterprises.create({
                data: {
                    cnpj,
                    corporationEmail,
                    fantasyName,
                    name,
                    size,
                    activeClients:{},
                    convenios: {},
                    accessKey: await bcrypt.hash(password, 2)
                }
            })
            return res.json({
                created: true,
                id: enterprise.id
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({created: false});
        }
    };
    async update(req: Req, res: Res): Promise<Res<any>> {
        const {
            corporationEmail,
            password,
            size
        } = req.body;
        const {id} = req.params;
        try {
            const enterprise = await database.enterprises.findUnique({
                where: {
                    id
                }
            })
            if (!enterprise) return res.status(404).json({err: "enterprise not found"});

            await database.enterprises.update({
                where: {
                    id
                },
                data: {
                    corporationEmail: corporationEmail ? corporationEmail: enterprise.corporationEmail,
                    accessKey: password ? await bcrypt.hash(password, 2): enterprise.accessKey,
                    size: size ? size : enterprise.size
                }
            })
            return res.json({updated: true});
        } catch (err) {
            console.log(err);
            return res.status(500).json({updated: false});
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
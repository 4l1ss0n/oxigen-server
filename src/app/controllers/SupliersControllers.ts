import { Response as Res, Request as Req } from "express";
import { database } from "../../database/src";

class SupliersControllers {
    async index(req: Req, res: Res): Promise<Res<any>> {
        try {
            const supliers = await database.supliers.findMany({
                include:{
                    _count:true,
                    product: {
                        select: {
                            id: true
                        }
                    }
                }
            });

            return res.json({data: supliers});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ok: false});
        }
    };
    async show(req: Req, res: Res): Promise<Res<any>> {
        try {
            return res.json({ok: true});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ok: false});
        }
    };
    async store(req: Req, res: Res): Promise<Res<any>> {
        const {
            name,
            category,
            cnpj
        } = req.body;
        try {
            await database.supliers.create({
                data: {
                    name,
                    category,
                    cnpj,
                }
            });
            return res.json({ok: true});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ok: false});
        }
    };
    async update(req: Req, res: Res): Promise<Res<any>> {
        try {
            return res.json({ok: true});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ok: false});
        }
    };
    async delete(req: Req, res: Res): Promise<Res<any>> {
        try {
            return res.json({ok: true});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ok: false});
        }
    };
}

export default SupliersControllers;
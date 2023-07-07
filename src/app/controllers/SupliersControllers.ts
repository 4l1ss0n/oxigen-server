import { Response as Res, Request as Req } from "express";
import { database } from "../../database/src";

class SupliersControllers {
    async index(req: Req, res: Res): Promise<Res<any>> {
        try {
            const supliers = await database.supliers.findMany({
                select: {
                    id: true,
                    name: true,
                    category: true,
                    product: {
                       select: {
                        id: true
                       }
                    }
                },
                
            });

            return res.json({data: supliers});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ok: false});
        }
    };
    async show(req: Req, res: Res): Promise<Res<any>> {
        const {id} = req.params;
        try {
            const suplier = await database.supliers.findUnique({
                where: {id},
                select: {
                    id: true,
                    name: true,
                    cnpj: true,
                }
            });
            if (!suplier) return res.status(404).json({err: "suplier not found"});
            return res.json({data: suplier});
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
            const suplier = await database.supliers.create({
                data: {
                    name,
                    category,
                    cnpj,
                }
            });
            return res.json({created: true, id: suplier.id});
        } catch (err) {
            console.log(err);
            return res.status(500).json({created: false});
        }
    };
    async update(req: Req, res: Res): Promise<Res<any>> {
        const { name, category } = req.body;
        const { id } = req.params;
        try {
            const suplier = await database.supliers.findUnique({
                where: { id }
            });
            if (!suplier) return res.status(404).json({err: "suplier not found"});
            await database.supliers.update({
                where: { id },
                data: {
                    category: category? category: suplier.category,
                    name: name? name: suplier.name
                }
            });
            return res.json({updated: true});
        } catch (err) {
            console.log(err);
            return res.status(500).json({udpated: false});
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
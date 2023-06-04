import { Response as Res, Request as Req } from "express";
import { database } from "../../database/src";

class ProductsControllers {
    async index(req: Req, res: Res): Promise<Res<any>> {
        try {
            const products = await database.products.findMany({
                include: {
                    _count: true,
                    supliers: {
                        select: {
                            id: true
                        }
                    }
                }
            });

            return res.json({data: products});
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
            description,
            quantity,
            cost,
            components,
            color,
            supliersIds
        } = req.body;
        try {
            const product = await database.products.create({
                data: {
                    name,
                    description,
                    cost,
                    quantity,
                    color: color? color: null,
                    components,
                }
            });
            const supliersProducts = supliersIds.map((supliers: string) => ({
                suplierId: supliers,
                productId: product.id
            }));
            await database.productSupiers.createMany({
                data: supliersProducts
            })
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

export default ProductsControllers
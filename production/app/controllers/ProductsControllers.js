"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../database/src");
class ProductsControllers {
    async index(req, res) {
        const profit = process.env.PROFIT_PERCENTAGE;
        try {
            const products = await src_1.database.products.findMany({
                select: {
                    id: true,
                    name: true,
                    cost: true
                }
            });
            return res.json({ data: products });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ ok: false });
        }
    }
    ;
    async show(req, res) {
        const { id } = req.params;
        try {
            const product = await src_1.database.products.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    quantity: true,
                    cost: true,
                    color: true,
                    components: true
                }
            });
            if (!product)
                return res.status(404).json({ err: "product not found" });
            return res.json({ data: product });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ ok: false });
        }
    }
    ;
    async store(req, res) {
        const { name, description, quantity, cost, components, color, supliersIds } = req.body;
        try {
            const product = await src_1.database.products.create({
                data: {
                    name,
                    description,
                    cost,
                    quantity,
                    color: color ? color : null,
                    components,
                }
            });
            const supliersProducts = supliersIds.map((supliers) => ({
                suplierId: supliers,
                productId: product.id
            }));
            await src_1.database.productSupiers.createMany({
                data: supliersProducts
            });
            return res.json({
                created: true,
                id: product.id
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ created: false });
        }
    }
    ;
    async update(req, res) {
        const { name, description, quantity, cost, color, } = req.body;
        const { id } = req.params;
        try {
            const product = await src_1.database.products.findUnique({
                where: { id }
            });
            if (!product)
                return res.status(404).json({ err: "product not found" });
            await src_1.database.products.update({
                where: { id },
                data: {
                    name: name ? name : product.name,
                    description: description ? description : product.description,
                    quantity: quantity ? quantity : product.quantity,
                    color: color ? color : product.color,
                    cost: cost ? cost : product.cost
                }
            });
            return res.json({ updated: true });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ ok: false });
        }
    }
    ;
    async delete(req, res) {
        try {
            return res.json({ ok: true });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ ok: false });
        }
    }
    ;
}
exports.default = ProductsControllers;

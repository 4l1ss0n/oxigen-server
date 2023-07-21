"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../database/src");
class SupliersControllers {
    async index(req, res) {
        try {
            const supliers = await src_1.database.supliers.findMany({
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
            return res.json({ data: supliers });
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
            const suplier = await src_1.database.supliers.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    cnpj: true,
                }
            });
            if (!suplier)
                return res.status(404).json({ err: "suplier not found" });
            return res.json({ data: suplier });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ ok: false });
        }
    }
    ;
    async store(req, res) {
        const { name, category, cnpj } = req.body;
        try {
            const suplier = await src_1.database.supliers.create({
                data: {
                    name,
                    category,
                    cnpj,
                }
            });
            return res.json({ created: true, id: suplier.id });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ created: false });
        }
    }
    ;
    async update(req, res) {
        const { name, category } = req.body;
        const { id } = req.params;
        try {
            const suplier = await src_1.database.supliers.findUnique({
                where: { id }
            });
            if (!suplier)
                return res.status(404).json({ err: "suplier not found" });
            await src_1.database.supliers.update({
                where: { id },
                data: {
                    category: category ? category : suplier.category,
                    name: name ? name : suplier.name
                }
            });
            return res.json({ updated: true });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ udpated: false });
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
exports.default = SupliersControllers;

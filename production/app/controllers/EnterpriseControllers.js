"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../database/src");
const bcrypt_1 = __importDefault(require("bcrypt"));
class EnterpriseControllers {
    async index(req, res) {
        try {
            const enterprise = await src_1.database.enterprises.findMany({
                select: {
                    id: true,
                    name: true,
                    _count: true
                }
            });
            return res.json({ data: enterprise });
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
            const enterprise = await src_1.database.enterprises.findUnique({
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
            });
            if (!enterprise)
                return res.status(404).json({ err: "enterprise not found" });
            return res.json({ data: enterprise });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ ok: false });
        }
    }
    ;
    async store(req, res) {
        const { cnpj, fantasyName, name, corporationEmail, password, size } = req.body;
        try {
            const enterprise = await src_1.database.enterprises.create({
                data: {
                    cnpj,
                    corporationEmail,
                    fantasyName,
                    name,
                    size,
                    activeClients: {},
                    convenios: {},
                    accessKey: await bcrypt_1.default.hash(password, 2)
                }
            });
            return res.json({
                created: true,
                id: enterprise.id
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ created: false });
        }
    }
    ;
    async update(req, res) {
        const { corporationEmail, password, size } = req.body;
        const { id } = req.params;
        try {
            const enterprise = await src_1.database.enterprises.findUnique({
                where: {
                    id
                }
            });
            if (!enterprise)
                return res.status(404).json({ err: "enterprise not found" });
            await src_1.database.enterprises.update({
                where: {
                    id
                },
                data: {
                    corporationEmail: corporationEmail ? corporationEmail : enterprise.corporationEmail,
                    accessKey: password ? await bcrypt_1.default.hash(password, 2) : enterprise.accessKey,
                    size: size ? size : enterprise.size
                }
            });
            return res.json({ updated: true });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ updated: false });
        }
    }
    ;
    async delete(req, res) {
        try {
            return res.json({ ok: true });
        }
        catch (err) {
            return res.status(500).json({ ok: true });
        }
    }
    ;
}
exports.default = EnterpriseControllers;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const src_1 = require("../../database/src");
class ClientsControllers {
    async index(req, res) {
        try {
            const client = await src_1.database.clients.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    gender: true,
                    convenio: {
                        include: {
                            _count: true
                        }
                    }
                }
            });
            return res.status(200).json({ data: client });
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
            const client = await src_1.database.clients.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    gender: true,
                    personId: true,
                    birthday: true,
                    convenio: {
                        include: {
                            _count: true
                        }
                    }
                }
            });
            if (!client)
                return res.status(404).json({ err: "client not found" });
            return res.json({ data: client });
        }
        catch (err) {
            return res.status(500).json({ ok: false });
        }
    }
    ;
    async store(req, res) {
        const { name, email, password, cpf, birthday, gender, enterpriseId } = req.body;
        try {
            const client = await src_1.database.clients.create({
                data: {
                    name,
                    email,
                    pswhs: await bcrypt_1.default.hash(password, 2),
                    birthday: new Date(birthday),
                    gender: gender.toUpperCase() === "M" ? "MALE" : "FEMALE",
                    personId: cpf,
                    convenio: {},
                    enterprise: {
                        connect: {
                            id: enterpriseId
                        }
                    }
                }
            });
            return res.json({ data: {
                    created: true,
                    id: client.id
                } });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ created: false });
        }
    }
    ;
    async update(req, res) {
        const { name, email, password, birthday, } = req.body;
        const { id } = req.params;
        try {
            if (!(name || email || password || birthday))
                return res.status(401).json({ err: "missing data" });
            const client = await src_1.database.clients.findUnique({
                where: {
                    id
                }
            });
            if (!client)
                return res.status(404).json({ err: "client not found" });
            await src_1.database.clients.update({
                where: {
                    id
                },
                data: {
                    name: name ? name : client.name,
                    email: email ? email : client.email,
                    pswhs: password ? await bcrypt_1.default.hash(password, 2) : client.pswhs,
                    birthday: birthday ? new Date(birthday) : client.birthday,
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
            console.log(err);
            return res.status(500).json({ deleted: false });
        }
    }
    ;
}
exports.default = ClientsControllers;

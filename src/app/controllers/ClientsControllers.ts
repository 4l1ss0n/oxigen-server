import { Request as Req, Response as Res } from "express";
import bcrypt from "bcrypt";
import { database } from "../../database/src";


class ClientsControllers {
    async index(req: Req, res: Res): Promise<Res<any>> {
        try {
            const client = database.clients.findMany();
            return res.json({data: [
                client
            ]});
        } catch (err) {
            return res.status(500).json({ok: true});
        }
    };
    async show(req: Req, res: Res): Promise<Res<any>> {
        try {
            return res.json({ok: true});
        } catch (err) {
            return res.status(500).json({ok: true});
        }
    };
    async store(req: Req, res: Res): Promise<Res<any>> {
        const {
            name,
            email,
            password,
            cpf,
            birthday,
            gender,
            enterpriseId
        } = req.body;
        try {
            await database.clients.create({
                data: {
                    name,
                    email,
                    pswhs: await bcrypt.hash(password, 2),
                    birthday: new Date(birthday),
                    gender: gender === "M" || gender === "m" ? "MALE": "FEMALE",
                    personId: cpf,
                    convenio: {},
                    enterprise: enterpriseId 
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

export default ClientsControllers;
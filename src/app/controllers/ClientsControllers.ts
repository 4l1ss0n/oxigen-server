import { Request as Req, Response as Res } from "express";
import bcrypt from "bcrypt";
import { database } from "../../database/src";


class ClientsControllers {
    async index(req: Req, res: Res): Promise<Res<any>> {
        try {
            const client = await database.clients.findMany({
                select: {
                    id: true,
                    name:  true,
                    email: true,
                    gender: true,
                    convenio: {
                        include: {
                            _count: true
                        }
                    }
                }
            });
            return res.status(200).json({data: client});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ok: true});
        }
    };
    async show(req: Req, res: Res): Promise<Res<any>> {
        const {id} = req.params;
        try {
            const client = await database.clients.findUnique({
                where: {id},
                select: {
                    id: true,
                    name:  true,
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
            if (!client) return res.status(404).json({err: "client not found"});
            return res.json({data: client});
        } catch (err) {
            return res.status(500).json({err: "something went wrong"});
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
            const client = await database.clients.create({
                data: {
                    name,
                    email,
                    pswhs: await bcrypt.hash(password, 2),
                    birthday: new Date(birthday),
                    gender: gender.toUpperCase() === "M"? "MALE": "FEMALE",
                    personId: cpf,
                    convenio: {},
                    enterprise: {
                        connect: {
                            id: enterpriseId
                        }
                    } 
                }   
            })
            return res.json({data: {
                created: true,
                id: client.id
            }});
        } catch (err) {
            console.log(err);
            return res.status(500).json({err: "something went wrong"});
        }
    };
    async update(req: Req, res: Res): Promise<Res<any>> {
        const {
            name,
            email,
            password,
            birthday,
        } = req.body;
        const {id} = req.params;
        try {
            if (!(name || email || password || birthday)) return res.status(401).json({err: "missing data"});
            const client = await database.clients.findUnique({
                where: {
                    id
                }
            });
            if (!client) return res.status(404).json({err: "client not found"});

            await database.clients.update({
                where:{
                    id
                },
                data: {
                    name: name ? name : client.name,
                    email: email ? email : client.email,
                    pswhs: password ? await bcrypt.hash(password, 2) : client.pswhs,
                    birthday: birthday ? new Date(birthday) : client.birthday,
                }
            })
            return res.json({ok: true});
        } catch (err) {
            console.log(err);
            return res.status(500).json({err: "something went wrong"});
        }
    };
    async delete(req: Req, res: Res): Promise<Res<any>> {
        try {
            return res.json({ok: true});
        } catch (err) {
            console.log(err);
            return res.status(500).json({err: "something went wrong"});
        }
    };
}

export default ClientsControllers;
import { Response as Res, Request as Req } from "express";
import { database } from "../../database/src";
import bcrypt from "bcrypt";

class EmployeesControllers {
    async index(req: Req, res: Res): Promise<Res<any>> {
        try {
            const employees = await database.employees.findMany();
            return res.json({data: employees});
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
            email,
            password,
            cpf,
            birthday,
            gender
        } = req.body;
        try {
            await database.employees.create({
                data: {
                    name,
                    birthday: new Date(birthday),
                    email,
                    gender: gender === "m" || gender === "M" ? "MALE" : "FEMALE",
                    personId: cpf,
                    pswhs: await bcrypt.hash(password, 2)
                }
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

export default EmployeesControllers;
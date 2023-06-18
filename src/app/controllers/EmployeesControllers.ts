import { Response as Res, Request as Req } from "express";
import { database } from "../../database/src";
import bcrypt from "bcrypt";

class EmployeesControllers {
    async index(req: Req, res: Res): Promise<Res<any>> {
        try {
            const employees = await database.employees.findMany({
                select: {
                    name: true,
                    email: true,
                    responsabity: true,
                    gender:  true,
                    id: true,
                }
            });
            return res.json({data: employees});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ok: false});
        }
    };
    async show(req: Req, res: Res): Promise<Res<any>> {
        const {id} = req.params;
        try {
            if(!id) return res.status(404).json({err: "missing datas"});
            
            const employee = await database.employees.findUnique({
                where: {id}
            });
            if (!employee) return res.status(404).json({err: "employee not found"});
            return res.json({data: employee});
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
        const {
            name,
            email,
            password,
            cpf,
            birthday,
            gender
        } = req.body;
        const {id} = req.params;
        try {
            if (!(name || email || password || cpf || birthday || gender)) return res.status(404).json({err: "missing datas"});
            const employee = await database.employees.findUnique({
                where: {id}
            });
            if (!employee) return res.status(404).json({err: "employee not found"});

            await database.employees.update({
                where: {
                    id
                },
                data: {
                    name: name ? name : employee.name,
                    email: email ? email : employee.email,
                    personId: cpf ? cpf : employee.personId,
                    birthday: birthday ? birthday : employee.birthday,
                    gender: gender ? gender : employee.gender,
                    pswhs: password ? await bcrypt.hash(password, 2) : employee.pswhs,
                }
            })
            return res.json({updated: true});
        } catch (err) {
            console.log(err);
            return res.status(500).json({updated: false});
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
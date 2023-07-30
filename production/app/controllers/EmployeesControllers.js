"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../database/src");
const bcrypt_1 = __importDefault(require("bcrypt"));
class EmployeesControllers {
    async index(req, res) {
        try {
            const employees = await src_1.database.employees.findMany({
                select: {
                    id: true,
                    name: true,
                    responsabity: true
                }
            });
            return res.json({ data: employees });
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
            if (!id)
                return res.status(404).json({ err: "missing datas" });
            const employee = await src_1.database.employees.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    responsabity: true,
                    birthday: true,
                    email: true,
                    gender: true,
                    personId: true,
                }
            });
            if (!employee)
                return res.status(404).json({ err: "employee not found" });
            return res.json({ data: employee });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ ok: false });
        }
    }
    ;
    async store(req, res) {
        const { name, email, password, cpf, birthday, gender } = req.body;
        try {
            const deployee = await src_1.database.employees.create({
                data: {
                    name,
                    birthday: new Date(birthday),
                    email,
                    gender: gender === "m" || gender === "M" ? "MALE" : "FEMALE",
                    personId: cpf,
                    pswhs: await bcrypt_1.default.hash(password, 2)
                }
            });
            return res.json({
                created: true,
                id: deployee.id
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ created: false });
        }
    }
    ;
    async update(req, res) {
        const { name, email, password, cpf, birthday, gender } = req.body;
        const { id } = req.params;
        try {
            if (!(name || email || password || cpf || birthday || gender))
                return res.status(404).json({ err: "missing datas" });
            const employee = await src_1.database.employees.findUnique({
                where: { id }
            });
            if (!employee)
                return res.status(404).json({ err: "employee not found" });
            await src_1.database.employees.update({
                where: {
                    id
                },
                data: {
                    name: name ? name : employee.name,
                    email: email ? email : employee.email,
                    personId: cpf ? cpf : employee.personId,
                    birthday: birthday ? birthday : employee.birthday,
                    gender: gender ? gender : employee.gender,
                    pswhs: password ? await bcrypt_1.default.hash(password, 2) : employee.pswhs,
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
            return res.json({ deleted: true });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ deleted: false });
        }
    }
    ;
}
exports.default = EmployeesControllers;

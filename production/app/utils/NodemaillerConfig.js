"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function default_1(message) {
    const { EMAIL_HOST, EMAIL_USER, EMAIL_PASS } = process.env;
    const mailTransporter = nodemailer_1.default.createTransport({
        host: EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });
    const returnResponse = await mailTransporter.sendMail({
        from: message.from,
        to: message.to,
        subject: message.subject,
        html: fs_1.default.createReadStream(path_1.default.resolve(__filename, "..", "..", "..", "static", message.htmlName + ".html"))
    });
}
exports.default = default_1;

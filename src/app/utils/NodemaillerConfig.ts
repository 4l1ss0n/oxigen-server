import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export interface EmailType {
    from: string,
    to: string,
    subject: string,
    htmlName: string,
    args?: {}
}

export default async function(message: EmailType) {
    const {
        EMAIL_HOST,
        EMAIL_USER,
        EMAIL_PASS
    } = process.env;

    const mailTransporter = nodemailer.createTransport({
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
        html: fs.createReadStream(path.resolve(__filename, "..", "..", "..", "static", message.htmlName + ".html"))
    });
}
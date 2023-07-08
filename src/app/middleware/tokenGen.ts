import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY_JWT || "Alisson";

export default (id: any, time: string): string => {
    return jwt.sign(id, secret, {
        expiresIn: time
    })
};
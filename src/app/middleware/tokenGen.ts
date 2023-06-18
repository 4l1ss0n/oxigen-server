import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY_JWT || "Alisson";

export default (id: {}, temp: string): string => {
    return jwt.sign(id, secret, {
        expiresIn: temp
    })
};
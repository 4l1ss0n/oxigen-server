"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(req, res, next) {
    const secret = process.env.SECRET_KEY_JWT || "Alisson";
    const auth = req.headers.authorization;
    if (!auth)
        return res.status(401).json({
            err: 1,
            msg: "token not send"
        });
    const [basic, token] = auth.split(" ");
    if (!token)
        return res.status(404).json({
            err: 2,
            msg: "token not found"
        });
    jsonwebtoken_1.default.verify(token, secret, (err, decode) => {
        if (err)
            return res.status(401).json({
                err: 3,
                msg: "invalid token"
            });
        req.body.auth = decode;
        next();
    });
}
exports.default = default_1;

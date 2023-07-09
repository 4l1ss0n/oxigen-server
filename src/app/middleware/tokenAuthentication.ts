import {  Request as Req, Response as Res, NextFunction as Next } from "express";
import jwt from "jsonwebtoken";

export default function(req: Req, res: Res, next: Next): any {
    const secret = process.env.SECRET_KEY_JWT || "Alisson"

    const auth = req.headers.authorization;

    if (!auth) return res.status(401).json({
        err: 1,
        msg: "token not send"
    });
    const [basic, token] = auth.split(" ");
    if (!token) return res.status(404).json({
        err: 2,
        msg: "token not found"
    });

    jwt.verify(token, secret, (err, decode) => {
        if (err) return res.status(401).json({
            err: 3,
            msg: "invalid token"
        })
        req.body.auth = decode;
        next();
    })
}
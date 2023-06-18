import { Request as Req, Response as Res } from "express";


class AuthControllers {
    async login(req: Req, res: Res): Promise<Res<any>> {
        try {
            return res.status(200).json({ok: true});
        } catch (err) {
            return res.status(500).json({ok: false});
            
        }
    };
    async register(req: Req, res: Res): Promise<Res<any>> {
        try {
            return res.status(200).json({ok: true});
        } catch (err) {
            return res.status(500).json({ok: false});
            
        }
    };
}

export default AuthControllers;
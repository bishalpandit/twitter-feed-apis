import { NextFunction, Request, Response } from "express";


export default class AuthController {
    public static async checkAuth(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            if (req.user)
                res.json(req.user);
            else
                res.json(null);
        } catch (err) {
            next(err);
        }
    }
}


import { Router } from "express";
import passport from "passport";
import AuthController from "../controllers/auth.controllers";
import '../auth/index'
const router = Router();

router.route('/login')
    .get(passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }));

router.get("/checkauth", AuthController.checkAuth);

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: "/login/failure",
        successRedirect: "http://localhost:3000"
    })
);

router.get('/logout', (req: any, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});

export default router;
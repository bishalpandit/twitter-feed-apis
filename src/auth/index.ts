import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import UserModel from '../model/user';
import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser(function (user: any, done: any) {
    done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
    done(null, user);
});

passport.use(new Strategy({
    clientID: GOOGLE_CLIENT_ID as string,
    clientSecret: GOOGLE_CLIENT_SECRET as string,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true,
},
    async (request: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
        try {
            const user = await UserModel.findOne({
                googleId: profile.id
            });
            
            // console.log(user);
            // console.log(profile);
            
            
            if (!user) {
                const newUser = {
                    googleId: profile.id,
                    username: profile._json.email.split("@")[0],
                    name: profile._json.name,
                    image: profile._json.picture
                };

                await UserModel.create(newUser);
                
                return done(null, newUser);
            }
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }

    }));


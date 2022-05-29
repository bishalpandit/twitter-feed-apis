import compression from "compression";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { connect } from "mongoose";
import morgan from "morgan";
import routes from "./routes";
import cors from "cors";
import http from 'http';
import createSockerServer from './services/socketServer.js'
import passport from "passport";
import session from "express-session";

dotenv.config();
const app = express();
const httpServer = new http.Server(app);

createSockerServer(httpServer);

async function connectDB(db_URI: string) {
  connect(db_URI).then(() => {
    console.info("Connected to MongoDB");
  });
}

connectDB(process.env.DBURI as string);

app.use(
  cors({
    credentials: true,
    origin: [`http://localhost:3000`, `https://Qwitter.com`],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  cookie: {
    maxAge: 12 * 60 * 60 * 1000,
  },
  secret: "tweetme",
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

httpServer.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT || 5000}`);
});

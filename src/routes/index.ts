import { Router, ErrorRequestHandler } from "express";
import AuthRouter from './auth.routes';
import TweetRouter from './tweet.routes';
const router = Router();

// TODO: create, get all, delete tweets. continue with google.
router.use("/auth", AuthRouter);
router.use("/tweet", TweetRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

router.use(errorHandler);

export default router;

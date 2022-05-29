import { Server } from "socket.io";
import TweetModel from "../model/tweet";

const createSockerServer = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000"]
        }
    })

    io.on("connection", (socket) => {
        socket.on("tweet:create", async (tweet: any) => {
            (async () => { await TweetModel.create({...tweet, user_id: tweet.user_id._id })})();

            const tweets = await TweetModel
            .find({})
            .sort({ createdAt: -1 })
            .populate("user_id") as any;

            socket.broadcast.emit("tweet:all", { tweets: [tweet, ...tweets] });
            socket.emit("tweet:all", { tweets: [tweet, ...tweets] });
        })

        socket.on("tweet:list", async (tweet: any) => {

            const tweets = await TweetModel
            .find({})
            .sort({ createdAt: -1 })
            .populate("user_id") as any;

            socket.emit("tweet:all", { tweets });
        })

        socket.on("tweet:like", async (data) => {
            const { tweetId, count } = data;

            const tweet = await TweetModel
            .findById(tweetId) as any;

            tweet.likes += count;

            await tweet.save();

            const tweets = await TweetModel
            .find({})
            .sort({ createdAt: -1 })
            .populate("user_id") as any;

            socket.broadcast.emit("tweet:all", { tweets });
            socket.emit("tweet:all", { tweets });
        })
    })
}

export default createSockerServer;


import { Document, model, ObjectId, Schema } from "mongoose";

export interface Tweet extends Document {
    content: string;
    image: string;
    user_id: ObjectId;
    likes: number;
}

const TweetSchema = new Schema<Tweet>({
    content: {
        type: String,
    },
    image: {
        type: String,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    likes: {
        type: Number,
    },
}, {
    timestamps: true,
});

const TweetModel = model<Tweet>("Tweet", TweetSchema);

export default TweetModel;

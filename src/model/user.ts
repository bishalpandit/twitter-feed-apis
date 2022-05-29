import { Document, model, ObjectId, Schema } from "mongoose";

export interface User extends Document {
    googleId: string;
    username: string;
    name: string;
    image: string;
}

const UserSchema = new Schema<User>({
    googleId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const UserModel = model<User>("User", UserSchema);

export default UserModel;

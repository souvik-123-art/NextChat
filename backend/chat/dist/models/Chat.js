import mongoose, { Document, Schema } from "mongoose";
const schema = new Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
    latestMessage: {
        text: String,
        sender: String,
    },
}, { timestamps: true });
export const Chat = mongoose.model("chat", schema);
//# sourceMappingURL=Chat.js.map
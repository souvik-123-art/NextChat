import mongoose, { Document, Schema, Types } from "mongoose";
const schema = new Schema({
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "chat",
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    text: String,
    image: {
        url: String,
        pubLicId: String
    },
    messageType: {
        type: String,
        enum: ["text", "image"],
        default: "text"
    },
    seen: {
        type: Boolean,
        default: false
    },
    seenAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });
export const Messages = mongoose.model("messages", schema);
//# sourceMappingURL=messages.js.map
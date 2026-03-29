import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import ChatRoutes from "./routes/chat.js";
dotenv.config();
connectDb();
app.use(express.json());
app.use(cors());
app.use("/api/v1", ChatRoutes);
app.listen(process.env.PORT, () => {
    console.log(`chat service running on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map
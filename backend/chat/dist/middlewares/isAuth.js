import { Document } from "mongoose";
import jwt, {} from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "please login - no auth header",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decodedVal = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedVal || !decodedVal.user) {
            res.status(401).json({
                message: "invalid token",
            });
            return;
        }
        req.user = decodedVal.user;
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "please login - jwt error",
        });
    }
};
//# sourceMappingURL=isAuth.js.map
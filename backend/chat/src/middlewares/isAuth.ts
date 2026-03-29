import type { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";
import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
interface Iuser extends Document {
  name: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: Iuser | null;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "please login - no auth header",
      });
      return;
    }
    const token = authHeader.split(" ")[1];

    const decodedVal = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    if (!decodedVal || !decodedVal.user) {
      res.status(401).json({
        message: "invalid token",
      });
      return;
    }
    req.user = decodedVal.user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "please login - jwt error",
    });
  }
};

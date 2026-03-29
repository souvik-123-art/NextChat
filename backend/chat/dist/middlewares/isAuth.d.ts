import type { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";
interface Iuser extends Document {
    name: string;
    email: string;
}
export interface AuthenticatedRequest extends Request {
    user?: Iuser | null;
}
export declare const isAuth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=isAuth.d.ts.map
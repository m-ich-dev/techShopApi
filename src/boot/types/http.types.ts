import { NextFunction, Request, Response } from "express";

export type TMWare = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

export type THttp<
    P = any,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any,
    Locals extends Record<string, any> = object
> = (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response<ResBody, Locals>) => Promise<Response<ResBody, Locals>>;

export type THttpLocals<L extends Record<string, any> = object> = THttp<any, any, any, any, L>; 

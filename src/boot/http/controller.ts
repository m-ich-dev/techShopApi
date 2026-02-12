import { Request, Response } from "express";

export type TCRUD<RQ = Request, RS = Response> = (req: RQ, res: RS) => Promise<RS>

export default abstract class Controller { }
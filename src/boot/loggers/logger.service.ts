import type { Request } from "express";
import logger from "./logger.js";
import type { IApiError } from "../types/http-error.types.js";


type THttpLog = {
    status: number,
    req?: Request
}

type THttpErrorLog = THttpLog & {
    err: Error,
    errResponse: IApiError[]
}

export default class LogService {

    public static httpErrorLog({
        status,
        err,
        req,
        errResponse
    }: THttpErrorLog) {
        const executer = req?.log || logger;
        const level = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';
        executer[level]({
            status,
            err,
            errResponse
        });
    }

}
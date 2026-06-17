import logger from "@/boot/loggers/logger.js";
import type { Options } from "pino-http";
import type { IncomingMessage, ServerResponse } from "node:http";


const httpPinoConfig: Options = {
    logger,
    autoLogging: false,

    serializers: {
        req(req: IncomingMessage) {
            return {
                method: req.method,
                url: req.url,
                ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown',
                agent: req.headers['user-agent'] || 'unknown'
            };
        },
        res(res: ServerResponse) {
            return {
                statusCode:
                    res.statusCode
            };
        }
    },
};

export default httpPinoConfig;
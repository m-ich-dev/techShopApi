import logger from "@/boot/loggers/logger.js";
import type { Options } from "pino-http";
import type { IncomingMessage, ServerResponse } from "node:http";
import crypto from 'node:crypto';


type PinoIncomingMessage = IncomingMessage & {
    raw?: {
        socket?: {
            remoteAddress?: string;
        };
    };
};

const httpPinoConfig: Options = {
    logger,
    autoLogging: false,
    genReqId: (req, res) => {
        const existingId = req.headers['x-correlation-id'];
        if (existingId) return existingId;

        const id = crypto.randomBytes(8).toString('hex');
        res.setHeader('x-correlation-id', id);
        return id;
    },
    serializers: {
        req(req: PinoIncomingMessage) {
            return {
                reqId: req.id,
                method: req.method,
                url: req.url,
                ip: req.headers['x-forwarded-for'] || req.raw?.socket?.remoteAddress || req.socket?.remoteAddress || 'unknown',
                agent: req.headers['user-agent'] || 'unknown'
            };
        },
        res(res: ServerResponse) {
            return {
                statusCode:
                    res.statusCode
            };
        }
    }
};

export default httpPinoConfig;
import pino, { type LoggerOptions } from "pino";
import { pinoHttp } from "pino-http";


const config: LoggerOptions = {
    level: process.env.MIN_LOG_LEVEL ?? "info",
};

if (process.env.NODE_ENV === 'development') {
    config.transport = {
        target: 'pino-pretty',
    };
}

const logger = pino(config);

export const httpLogger =
    pinoHttp({

        logger,
        autoLogging: false,

        serializers: {
            req(req) {
                return {
                    method: req.method,
                    url: req.url
                };
            },
            res(res) {
                return {
                    statusCode:
                        res.statusCode
                };
            },

        }

    });

export default logger;
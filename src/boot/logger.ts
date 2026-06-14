import pino from "pino";
import { pinoHttp } from "pino-http";

const logger = pino({
    level:
        process.env.MIN_LOG_LEVEL
        ?? "info"
});

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
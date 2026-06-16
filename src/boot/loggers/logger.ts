import pino from "pino";
import { pinoHttp } from "pino-http";
import pinoConfig from "@/boot/loggers/config/logger.config.js";

const logger = pino(pinoConfig);

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
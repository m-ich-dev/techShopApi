import { pinoHttp } from "pino-http";
import logger from "@/boot/loggers/logger.js";


const httpLogger =
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

export default httpLogger;
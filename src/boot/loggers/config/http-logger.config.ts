import type { Options } from "pino-http";
import logger from "@/boot/loggers/logger.js";


const httpPinoConfig: Options = {
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
};

export default httpPinoConfig;
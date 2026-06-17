import { pinoHttp } from "pino-http";
import httpPinoConfig from "./config/http-logger.config.js";


const httpLogger = pinoHttp(httpPinoConfig);

export default httpLogger;
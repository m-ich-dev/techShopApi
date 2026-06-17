import pino from "pino";
import pinoConfig from "@/boot/loggers/config/logger.config.js";

const logger = pino(pinoConfig);


export default logger;
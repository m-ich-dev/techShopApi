import type { LoggerOptions } from "pino";


const pinoConfig: LoggerOptions = {
    level: process.env.MIN_LOG_LEVEL ?? "info",
};

export default pinoConfig;
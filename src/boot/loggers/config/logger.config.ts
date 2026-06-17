import type { LoggerOptions } from "pino";
import pino from "pino";


const pinoConfig: LoggerOptions = {
    level: process.env.MIN_LOG_LEVEL ?? "info",
    timestamp: pino.stdTimeFunctions.isoTime
};

if (process.env.NODE_ENV === 'development') {
    pinoConfig.transport = {
        target: 'pino-pretty',
    };
}

export default pinoConfig;
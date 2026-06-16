import type { LoggerOptions } from "pino";


const pinoConfig: LoggerOptions = {
    level: process.env.MIN_LOG_LEVEL ?? "info",
};

if (process.env.NODE_ENV === 'development') {
    pinoConfig.transport = {
        target: 'pino-pretty',
    };
}

export default pinoConfig;
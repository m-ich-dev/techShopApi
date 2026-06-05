import cors from 'cors';
import HTTPError from '@/boot/http/http.error.js';


const allowedOrigins = process.env.APP_ALLOWED_ORIGINS?.split(',') || [];

export const appCors = cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            throw HTTPError.forbidden({ message: 'Not allowed by CORS' });
        }
    },
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['authorization'],
    credentials: true,
    maxAge: 86400
});
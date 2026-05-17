import express from 'express';
import 'dotenv/config';
import router from '@/routes/web.js';
import { errorHandler } from '@/middlewares/error-handler.middleware.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.APP_PORT ?? 3030;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.use(errorHandler);

export const serve = () => {
    const server = app.listen(PORT, () => {
        console.log('the server is running...');
    });

    return server;
};
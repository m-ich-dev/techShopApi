import express from 'express';
import 'dotenv/config';
import router from '@/routes/web.js';
import { errorHandler } from '@/middlewares/error-handler.middleware.js';
import cookieParser from 'cookie-parser';
import { appCors } from './config/cors.config.js';
import { appHelmet } from './config/helmet.config.js';
import setCache from '@/middlewares/server/cache-controll.middleware.js';
import notFoundHandler from '@/middlewares/server/404.middleware.js';

const PORT = process.env.APP_PORT ?? 3030;

const app = express();

app.set('trust proxy', 1);

app.use(appCors);
app.use(appHelmet);

app.use(setCache());

app.use(express.json());
app.use(cookieParser());
app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

export const serve = () => {
    const server = app.listen(PORT, () => {
        console.log('the server is running...');
    });

    return server;
};
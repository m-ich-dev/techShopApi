import express from 'express';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import router from '@/routes/web.js';
import { errorHandler } from '@/middlewares/error-handler.middleware.js';
import cookieParser from 'cookie-parser';
import { appCors } from './config/cors.config.js';
import { appHelmet } from './config/helmet.config.js';
import setCache from '@/middlewares/server/cache-controll.middleware.js';
import notFoundHandler from '@/middlewares/server/404.middleware.js';
import logger from '@/boot/loggers/logger.js';
import httpLogger from '@/boot/loggers/http-logger.js';
import { generatePublicDocument } from '@/boot/docs/openapi-generator.js';


const PORT = process.env.APP_PORT ?? 3030;

const app = express();

app.set('trust proxy', 1);
app.use(httpLogger);
app.use(appCors);
app.use(appHelmet);

app.use(setCache());

app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Публичная OpenAPI-документация: только store + auth.
// Полный документ (включая admin) сюда не подключается —
// генерируется локально через `npm run docs:generate`.
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(generatePublicDocument()));

app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

export const serve = () => {
    const server = app.listen(PORT, () => {
        logger.info('the server is running...');
    });

    return server;
};
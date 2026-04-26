import express from 'express';
import 'dotenv/config';
import router from '@/routes/web.js';
import { errorHandler } from '@/midllewares/error-handler.midlleware.js';


const PORT = process.env.APP_PORT ?? 3030;

const app = express();
app.use(express.json());

app.use(router);

app.use(errorHandler);

export const serve = () => {
    const server = app.listen(PORT, () => {
        console.log('the server is running...');
    });

    return server;
};
import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());

const PORT = process.env.APP_PORT ?? 3030;

export const serve = () => {
    const server = app.listen(PORT, () => {
        console.log('the server is running...');
    });

    return server;
};
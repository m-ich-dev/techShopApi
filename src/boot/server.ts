import express from 'express';
import 'dotenv/config';
import router from '../routes/web';

const PORT = process.env.APP_PORT ?? 3030;

const app = express();
app.use(express.json());

app.use(router);


export const serve = () => {
    const server = app.listen(PORT, () => {
        console.log('the server is running...');
    });

    return server;
};
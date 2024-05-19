import express, { json } from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import connectToMongoDB from './config/DatabaseConfig.js';
import AuthRouter from './api/routes/auth.js';

configDotenv();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(json());
app.use('/auth', AuthRouter);

connectToMongoDB();

app.listen(PORT, (err) => {
    if (!err) console.log(`Server listening on port ${PORT}`)
    else console.log('Unable to start server')
});
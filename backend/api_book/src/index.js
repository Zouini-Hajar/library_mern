import express, { json } from 'express';
import { configDotenv } from 'dotenv';
import connectToMongoDB from './config/DatabaseConfig.js';
import BookRouter from './api/routes/book.js';

configDotenv();

const PORT = process.env.PORT;

const app = express();

app.use(json());
app.use('/books', BookRouter);

connectToMongoDB();

app.listen(PORT, (err) => {
    if (!err) console.log(`Server listening on port ${PORT}`)
    else console.log('Unable to start server')
});
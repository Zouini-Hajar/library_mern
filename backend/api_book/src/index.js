import express, { json } from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import connectToMongoDB from './config/DatabaseConfig.js';
import BookRouter from './api/routes/book.js';
import { connectToRabbitMQ } from './config/RabbitMQConfig.js';

configDotenv();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(json());
app.use('/books', BookRouter);

connectToMongoDB();

connectToRabbitMQ()
    .then(() => console.log('Connected to RabbitMQ'))
    .catch((err) => console.log(`Unable to connect to RabbitMQ \n${err}`));

app.listen(PORT, (err) => {
    if (!err) console.log(`Server listening on port ${PORT}`)
    else console.log('Unable to start server')
});
import express from 'express';
import EmailRoute from './api/routes/Email.js';
import { connectRabbitMQ } from './config/RabbitMQConfig.js';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();
const port = process.env.PORT ;

app.use(express.json());
app.use('/email',EmailRoute);

connectRabbitMQ().then(
    () => {
        console.log('Connected to RabbitMQ');
    }
).catch(
    (err) => {
        console.error(`Error connecting to Rabbit
        ${err}`);
        }
)

app.listen(port, (error) => {
    if (!error) 
        console.log(`Server is running on port ${port}`);
    else
        console.log( `Error while starting the server ${error}`);
})


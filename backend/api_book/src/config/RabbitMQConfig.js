import amqp from 'amqplib';
import { configDotenv } from 'dotenv';

configDotenv();

const URL_RABBIT = process.env.URL_RABBIT;
const MAILING_QUEUE = process.env.MAILING_QUEUE;

let connection;
let channel;

export async function connectToRabbitMQ() {
    connection = await amqp.connect(URL_RABBIT);
    channel = await connection.createChannel();
    await channel.assertQueue(MAILING_QUEUE);
};

export { channel };
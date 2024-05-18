import amqp from 'amqplib';
import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';

configDotenv();

const MAILING_QUEUE = process.env.MAILING_QUEUE;

export const connectRabbitMQ = async () => {
  try {
    const url = process.env.URL_RABBIT;
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();
    await channel.assertQueue(MAILING_QUEUE);
    return { connection, channel };
  } catch (error) {
    throw new Error('Failed to connect to RabbitMQ: ' + error.message);
  }
};

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD
    }
});




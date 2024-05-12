import amqp from 'amqplib';
import nodemailer from 'nodemailer';


let connection, channel;
const mailingQueue = process.env.MAILING_QUEUE;

export const connectRabbitMQ = async () => {
    const url = process.env.URL_RABBIT;
    connection = await amqp.connect(url);
    channel = await connection.createChannel();
    channel.assertQueue(mailingQueue);
}

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'douaaamran3@gmail.com',
        pass: 'vodenyplvoagvyxe'
    }
});
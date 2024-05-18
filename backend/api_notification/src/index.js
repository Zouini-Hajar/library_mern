import express from 'express';
import axios from 'axios';
import { connectRabbitMQ, transporter } from './config/RabbitMQConfig.js';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();
const PORT = process.env.PORT;
const MAILING_QUEUE = process.env.MAILING_QUEUE;

app.use(express.json());

const fetchAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3003/auth/');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

connectRabbitMQ()
  .then(({ channel }) => {
    console.log("Connected to RabbitMQ");

    channel.consume(MAILING_QUEUE, async (msg) => {
      if (msg !== null) {
        const [type, data] = JSON.parse(msg.content.toString());

        let recipients = [];
        let subject = '';
        let text = '';

        try {
          const users = await fetchAllUsers();

          switch (type) {
            case 'New Book Added':
              recipients = users.filter(user => user.role === 'client').map(client => client.email);
              subject = 'New Book Available';
              text = `A new book titled "${data.title}" by ${data.authors.join(', ')} has been added.`;
              break;

            case 'Book Out Of Stock':
              recipients = users.filter(user => user.role === 'admin').map(admin => admin.email);
              subject = 'Book Out Of Stock';
              text = `The book titled "${data.title}" is out of stock.`;
              break;

            case 'Book Back on Stock':
              recipients = users.filter(user => user.role === 'client').map(client => client.email);
              subject = 'Book Back in Stock';
              text = `The book titled "${data.title}" is back in stock.`;
              break;

            default:
              console.error('Unknown message type:', type);
              channel.ack(msg);
              return;
          }

          if (recipients.length > 0) {
            const mailOptions = {
              from: process.env.EMAIL_USER,
              to: recipients.join(','),
              subject,
              text,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent: " + info.response);
          } else {
            console.warn("No recipients found for message type:", type);
          }

          channel.ack(msg);
        } catch (error) {
          console.error("Error processing message:", error);
          channel.nack(msg, false, true);
        }
      }
    });
  })
  .catch((err) => {
    console.error("Error connecting to RabbitMQ:", err);
  });

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on port ${PORT}`);
  } else {
    console.error("Error while starting the server:", error);
  }
});

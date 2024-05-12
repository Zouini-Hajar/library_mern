import nodemailer from 'nodemailer';
import { transporter } from '../../config/RabbitMQConfig.js';

export const sendEmail = async (req,res) => {
    try{
        const { from, to, subject, content } = req.body;
        console.log(from)

        const mailOptions = {
            from : from,
            to : to,
            subject : subject,
            text : content
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Email sent successfully');
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
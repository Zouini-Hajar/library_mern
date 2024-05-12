import { transporter } from '../../config/RabbitMQConfig.js';
import { emailSchema } from '../validations/OptionsValidation.js'

export const sendEmail = async (req,res) => {
    try{

        await emailSchema.validate(req.body);
        
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
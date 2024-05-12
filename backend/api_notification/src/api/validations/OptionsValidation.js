import yup from 'yup';

// Define Yup validation schema
export const emailSchema = yup.object().shape({
    from: yup.string().email('Invalid "from" email address').required('Please provide a "from" email address'),
    to: yup.string().email('Invalid "to" email address').required('Please provide a "to" email address'),
    subject: yup.string().required('Please provide a subject'),
    content: yup.string().required('Please provide email content'),
});

import yup from 'yup';

export const emailSchema = yup.object().shape({
    from: yup.string().email().required(),
    to: yup.string().email().required(),
    subject: yup.string().required(),
    content: yup.string().required(),
});

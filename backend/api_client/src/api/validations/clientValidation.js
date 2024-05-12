import yup from 'yup';

/*
    TODO:
    - make sure first and last names don't have numbers
    - check if phone number is valid
*/

export const addClientSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone_number: yup.string().required(),
    password: yup.string().min(8).required(),
});

export const updateClientSchema = yup.object().shape({
    id: yup.string().required(),
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email(),
    phone_number: yup.string()
});
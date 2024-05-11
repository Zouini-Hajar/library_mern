import yup from 'yup';

/*
    TODO:
    - make sure first and last names don't have numbers
    - check if phone number is valid
*/

export const addClientSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone_number: yup.string().required()
});

export const updateClientSchema = yup.object({
    id: yup.string().required(),
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email(),
    phone_number: yup.string()
});
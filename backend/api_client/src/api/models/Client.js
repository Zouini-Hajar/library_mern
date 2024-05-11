import { Schema, model } from "mongoose";

/*
    TODO:
    - set unique fields
    - set regex expressions
*/

const ClientSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    }
});

export default model('client', ClientSchema);
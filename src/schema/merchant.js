import Joi from "joi";
import { name } from ".";

const merchantSchema = {
    full_name: '',
    email: '',
    address: '',
    phone: '',
    business_name: '',
    business_address: '',
    pan_number: '',
    start_date: ''
};

const address = (label) => Joi.string().min(5).max(30).required().label(label);
const phone = (label) => Joi.string().pattern(/^\d{10}$/).required().label(label);
const customTLDs = ['com'];
const merchantValidator = Joi.object({
    full_name: name('Full Name'),
    email: Joi.string().email({ tlds: { allow: customTLDs } }).required().label('Email'),
    address: address('Address'),
    phone: phone('Phone Number'),
    business_name: name('Business Name'),
    business_address: address('Business Address'),
    pan_number: Joi.string().pattern(/^\d{9}$/).required().label('Pan Number'),
    start_date: Joi.date().iso().required().less(new Date())
        .label("Business started date").messages({
            'date.greater': `Release Date must be less than "${new Date().toISOString().slice(0, 10)}".`,
        })
});

export { merchantSchema, merchantValidator }
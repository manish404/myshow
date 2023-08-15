import Joi from "joi";
import { name } from ".";

const merchantSchema = {
    full_name: '',
    address: '',
    phone: '',
    business_name: '',
    business_address: '',
    pan_number: '',
    start_date: ''
};

const address = (label) => Joi.string().min(5).max(30).required().label(label);
const number = (min, max, label) => Joi.number().min(min).max(max).required().label(label);

const merchantValidator = Joi.object({
    full_name: name('Full Name'),
    address: address('Address'),
    phone: number(10, 10, 'Phone Number'),
    business_name: name('Business Name'),
    business_address: address('Business Address'),
    pan_number: number(15, 15, 'Pan Number'),
    start_date: Joi.date().iso().required().less(new Date())
        .label("Business started date").messages({
            'date.greater': `Release Date must be less than "${new Date().toISOString().slice(0, 10)}".`,
        })
});

export { merchantSchema, merchantValidator }
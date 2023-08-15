import Joi from "joi";
import { name, rows, columns, created_by } from "./index";

const addressSchema = {
    province: '',
    district: '',
    city: ''
};

const hallSchema = {
    name: '',
    city: '',
    rows: '',
    columns: '',
    created_by: ''
};

const address = (label) => Joi.number().required().label(label);

const hallValidator = Joi.object({
    name: name("Name").lowercase(),
    city: address("City"),
    rows: rows("Rows"),
    columns: columns("Columns"),
    created_by: created_by()
});

export { hallSchema, hallValidator, addressSchema };
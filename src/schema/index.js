import Joi from "joi"

const _title = (label) => Joi.string().required().max(30).min(3).label(label);
export const title = (label) => _title(label);
export const name = (label) => _title(label);
export const image = (label) => Joi.any().required().label(label);
export const created_by = () => Joi.any().allow();
const hNum = (label) => Joi.number().required().min(10).max(100).label(label);
export const rows = (label) => hNum(label);
export const columns = (label) => hNum(label);


// export { title, name, image, rows, columns, address, created_by };
import Joi from "joi";
import { image, title } from "./index";

const movieSchema = {
    title: '',
    description: '',
    fake_image: 'https://fakeimg.pl/700x400/?text=Poster',
    image: '',
    release_date: new Date().toISOString().slice(0, 10),
    created_by: null
};

const movieValidator = Joi.object({
    title: title("Title").lowercase(),
    description: Joi.string().required().min(10).max(500).label("Description"),
    image: image("Image"),
    release_date: Joi.date().iso().required().greater(new Date())
        .label("Release date").messages({
            'date.greater': `Release Date must be greater than "${new Date().toISOString().slice(0, 10)}".`,
        }),
    fake_image: Joi.string().allow(),
    created_by: Joi.any().allow()
});

export { movieSchema, movieValidator };
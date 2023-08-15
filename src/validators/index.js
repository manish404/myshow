import println from "@/helpers/print";

const validate = async (data, validationSchema) => {
    const { error, value } = await validationSchema.validate(data);

    if (error) {
        println(error.details[0].message, error.details);
        return { status: false, errors: error.details };
    }
    return { status: true };
};

export { validate };
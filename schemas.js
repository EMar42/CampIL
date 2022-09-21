const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

//Extension preventing escapeHTML - using sanitize-html npm
//(wont let suspicious html run at client/server side)
const extension = (joi) => ({
    type: "string",
    base: joi.string(), //define extension on joi.string()
    messages: {
        "string.escapeHTML": "{{#label}} must not include HTML!",
    },
    rules: {
        escapeHTML: {
            //extension is called escapeHTML
            //getting values
            validate(value, helpers) {
                //needs a function called validate, which JOI will call automatically.
                const clean = sanitizeHtml(value, {
                    allowedTags: [], //empty array (meaning NO allowed tags)
                    allowedAttributes: {}, //empty object (meaning NO allowed attributes)
                });
                //clean must be equal to initial value or we call error.
                if (clean !== value) return helpers.error("string.escapeHTML", { value });
                //everything passes, so can return the clean.
                return clean; 
            },
        },
    },
});

//using "old version of joi with the new extension"
const Joi = BaseJoi.extend(extension);

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        // image: Joi.string().required(),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML(),
    }).required(),
});

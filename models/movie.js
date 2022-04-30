const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const Movie = mongoose.model("Movie", new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
        trim: true
    },
    genre: {
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        minlength: 0,
        maxlength: 15,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        minlength: 0,
        maxlength: 10,
        required: true
    }

}));

function validateMovie(movie) {
    const schema = {
        title: Joi.string().required().min(4).max(255),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(15).required(),
        dailyRentalRate: Joi.number().min(0).max(10).required()
    };

    return Joi.validate(movie, schema)
}

exports.Movie = Movie;
exports.validate = validateMovie;

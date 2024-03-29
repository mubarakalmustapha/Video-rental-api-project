const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 50,
        required: true
    }
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
    const schema = {
        name: Joi.string().required().min(4).max(50)
    }
    return Joi.validate(genre, schema)
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin,
        name: this.name,
        email: this.email,
    }, config.get("jwtPrivateKey"));

    return token;
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(4).max(50).required().label("Name"),
        email: Joi.string().min(4).max(255).required().label("Email"),
        password: Joi.string().required().min(4).max(255).label("Password"),
        isAdmin: Joi.boolean()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
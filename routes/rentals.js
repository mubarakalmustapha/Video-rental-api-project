const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const rentals = await Rental.find().sort("name");
    res.send(rentals);
});

router.get("/:id", async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send("The rental with the giving ID was not found");

    res.send(rental);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Invalid movie");

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Invalid customer");

    const rental = new Rental({
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        }
    });
    await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);
});

module.exports = router;
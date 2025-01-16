const mongoose = require('mongoose');

const TourismLoginSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Ensure name is required
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    password: { type: String, required: true } // Ensure password is required
});

const TourismLoginModel = mongoose.model("registrations", TourismLoginSchema);

module.exports = TourismLoginModel;
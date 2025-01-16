const express = require('express');
const TourismLoginModel = require('../models/TourismLogin'); // Corrected model import
const router = express.Router();

// Endpoint to check if the email is registered
router.get('/check-email/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await TourismLoginModel.findOne({ email });  // Corrected model usage

        if (user) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error checking email.' });
    }
});

module.exports = router;

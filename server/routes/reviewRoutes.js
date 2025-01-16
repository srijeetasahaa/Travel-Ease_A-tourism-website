const express = require('express');
const Review = require('../models/Review');

const router = express.Router();





// Validation middleware for reviews
function validateReview(req, res, next) {
    const { name, review } = req.body;
    if (!name || !review) {
        return res.status(400).json({ error: 'Name and review are required.' });
    }
    next();
}

// Create a new review
router.post('/', validateReview, async (req, res) => {
    const { name, review } = req.body;
    try {
        const newReview = new Review({ name, review });
        await newReview.save();
        res.status(201).json({ message: 'Review created successfully!', review: newReview });
    } catch (err) {
        console.error('Error creating review:', err.message);
        res.status(500).json({ error: 'Failed to create review. Please try again later.' });
    }
});

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ date: -1 }); // Sort by latest date
        res.status(200).json(reviews);
    } catch (err) {
        console.error('Error fetching reviews:', err.message);
        res.status(500).json({ error: 'Failed to fetch reviews. Please try again later.' });
    }
});

// Export the router
module.exports = router;

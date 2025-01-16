

require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import models
const TourismLoginModel = require('./models/TourismLogin'); // Make sure this path is correct
const Review = require('./models/Review'); // Review model
const checkEmailRoute = require('./routes/checkEmail');

const app = express();

// Use PORT from .env or default to 3001 (for .env or non-.env based settings)
const PORT = process.env.PORT || 3001; 



// Middleware
app.use('/api', checkEmailRoute);
app.use(express.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.static(path.join(__dirname, '..', 'client', 'dist'))); // Serve static files from the 'dist' folder in 'client' directory

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/tourismLogin";  // Use .env for Mongo URI if available
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes for Login and Register

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  TourismLoginModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Login Success");
        } else {
          res.json("The password is incorrect");
        }
      } else {
        res.json("No record exists");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json('An error occurred while processing your request.');
    });
});

// Register route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new TourismLoginModel({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Error registering user:", err); // Log the error
    res.status(500).json({ message: 'Error registering user', error: err });
  }
});

// Routes for Reviews

// Create a new review
app.post('/api/reviews', async (req, res) => {
  const { name, review } = req.body;
  try {
    const newReview = new Review({ name, review });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Serve static HTML home page (index.html) at /home
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html')); // Static HTML home page
});

// Default route for React (if users access any undefined route)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html')); // Serve React app
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

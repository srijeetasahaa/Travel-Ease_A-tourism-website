

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login'; // Your React login component
import Register from './Register'; // Your React register component
import ReviewForm from './components/ReviewForm';
import ReviewsList from './components/ReviewsList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* React Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect to the Static HTML home page */}
//         <Route path="/home" element={<RedirectToHomePage />} />

        {/* Review page route */}
        <Route path="/reviews" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const ReviewPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', textAlign: 'center', color: 'orange' }}>
      <h1>Review Page</h1>
      
      <ReviewForm />
      <ReviewsList />
    </div>
  );
};

// This component will redirect the user to the static HTML home page
const RedirectToHomePage = () => {
  window.location.href = 'http://localhost:3001/'; // Redirect to the static HTML home page
  return null; // This component doesn't need to render anything
};

export default App;

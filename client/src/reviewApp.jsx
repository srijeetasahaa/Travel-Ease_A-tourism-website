import React from 'react';
import ReviewForm from './components/ReviewForm';
import ReviewsList from './components/ReviewsList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', textAlign: 'center', color: 'orange' }}>
            <h1>Review Page</h1>
            
            <ReviewForm />
        
            <ReviewsList />
        </div>
    );
}

export default App;

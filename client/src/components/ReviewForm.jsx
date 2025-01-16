import React, { useState } from 'react';
import { createReview } from '../services/reviewService';

function ReviewForm() {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createReview({ name, review });
        setName('');
        setReview('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <input
                type="text"
                value={name}
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
                required
                style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #fd841f', width: '250px', backgroundColor: '#f0f8ff', color: '#000' }}
            />
            <textarea
                value={review}
                placeholder="Write your review"
                onChange={(e) => setReview(e.target.value)}
                required
                maxLength={300}
                style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #fd841f', width: '550px', height: '100px', resize: 'none', backgroundColor: '#f0f8ff', color: '#000' }}
            >
                <small>{300 - review.length} characters remaining</small>  
            </textarea>

            <button
                type="submit"
                style={{
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#646cff',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#f75c0e')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#fd841f')}
            >
                Submit
            </button>
        </form>
        
    );
}

export default ReviewForm;

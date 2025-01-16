import React, { useEffect, useState } from 'react';
import { fetchReviews } from '../services/reviewService';

function ReviewsList() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getReviews = async () => {
            const fetchedReviews = await fetchReviews();
            setReviews(fetchedReviews);
        };
        getReviews();
    }, []);

    return (
        <div
            style={{
                padding: '20px',
                backgroundImage: 'url("public/review_background.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '10px',
            }}
        >
            <h2 style={{ color: 'orange', textAlign: 'center' }}>User Reviews</h2>
            <div className="card-container" style={{ padding: '20px' , textAlign:'left'}}>
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="card"
                        style={{
                            minWidth: '300px',
                            margin: '10px 0',
                            padding: '20px',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: '#fff',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            textAlign: 'left',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                            gap: '10px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                                src="public/user.png"
                                alt="User Icon"
                                style={{ width: '40px', borderRadius: '50%' }}
                            />
                            <h4 style={{ margin: 0 }}>{review.name}</h4>
                        </div>
                        <p style={{ margin: '10px 0' }}>{review.review}</p>
                        <small style={{ fontSize: '0.9em' }}>
                            {new Date(review.date).toLocaleString()}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewsList;

const API_URL = 'http://localhost:3001/api/reviews';

export const createReview = async (reviewData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    });

    const data = await response.json();
    return data;
};

export const fetchReviews = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
};

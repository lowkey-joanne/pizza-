import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch('http://localhost:5555/restaurants') // Ensure this matches your API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setRestaurants(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <section className="container">
            <h1>Restaurants</h1>
            {restaurants.length === 0 ? (
                <p>No restaurants available.</p>
            ) : (
                restaurants.map(restaurant => (
                    <div key={restaurant.id} className="card">
                        <h2>
                            <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
                        </h2>
                        <p>Address: {restaurant.address}</p>
                    </div>
                ))
            )}
        </section>
    );
};
export default RestaurantList;

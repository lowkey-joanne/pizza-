import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantList from './RestaurantList'; // Optional: If you want to keep it separate

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  // Fetch restaurants from the API when the component mounts
  useEffect(() => {
    fetch("http://localhost:5555/restaurants") // Ensure you specify the full API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(setRestaurants)
      .catch((error) => console.error('Error fetching restaurants:', error));
  }, []);

  // Handle restaurant deletion
  function handleDelete(id) {
    fetch(`http://localhost:5555/restaurants/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setRestaurants((prevRestaurants) =>
          prevRestaurants.filter((restaurant) => restaurant.id !== id)
        );
      } else {
        console.error('Error deleting restaurant');
      }
    });
  }

  return (
    <section className="container">
      <h1>Welcome to Our Pizza Restaurant App</h1>
      {restaurants.length === 0 ? (
        <p>No restaurants available.</p>
      ) : (
        restaurants.map((restaurant) => (
          <div key={restaurant.id} className="card">
            <h2>
              <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
            </h2>
            <p>Address: {restaurant.address}</p>
            <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
          </div>
        ))
      )}
    </section>
  );
}

export default Home;
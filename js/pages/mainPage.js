import {renderRestaurantMenu} from '../components/restaurantMenu.js';
import {
  getSortedRestaurantsByDistance,
  getUserLocation,
} from '../utils/locationUtils.js';
import {fetchAllRestaurants, fetchWeeklyMenu} from '../api/restaurants.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const allRestaurants = await fetchAllRestaurants();
    console.log(allRestaurants);
    const userCoordinates = await getUserLocation();
    console.log(userCoordinates);
    const sortedRestaurants = await getSortedRestaurantsByDistance(
      userCoordinates,
      allRestaurants
    );
    console.log(sortedRestaurants);
    const closest = sortedRestaurants[0];

    const menu = await fetchWeeklyMenu(closest._id);
    console.log(closest._id);
    console.log(menu);
    renderRestaurantMenu(closest, menu);
  } catch (error) {
    console.error('Virhe etusivun latauksessa:', error);
  }
});

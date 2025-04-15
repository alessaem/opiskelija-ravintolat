import {
  getSortedRestaurantsByDistance,
  getUserLocation,
} from '../utils/locationUtils.js';
import {restaurantDropdown} from '../components/restaurantDropdown.js';
import {
  fetchAllRestaurants,
  fetchWeeklyMenu,
  fetchDailyMenu,
} from '../api/restaurants.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const allRestaurants = await fetchAllRestaurants();
    const daily = await fetchDailyMenu(allRestaurants[0]._id);
    console.log(daily);
    const weekly = await fetchWeeklyMenu(allRestaurants[0]._id);
    restaurantDropdown(allRestaurants[0], daily, weekly);
    // for (const restaurant of allRestaurants) {
    //   const daily = await fetchDailyMenu(restaurant._id);
    //   console.log(daily);
    //   const weekly = await fetchWeeklyMenu(restaurant._id);
    //   restaurantDropdown(restaurant, daily, weekly);
    // }
  } catch (error) {
    console.error(error);
  }
});

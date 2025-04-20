import {renderRestaurantMenu} from '../components/restaurantMenu.js';
import {
  getSortedRestaurantsByDistance,
  getUserLocation,
} from '../utils/locationUtils.js';
import {
  fetchAllRestaurants,
  fetchWeeklyMenu,
  fetchRestaurant,
} from '../api/restaurants.js';
import {getUserInfo} from '../api/user.js';

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const togglediv = document.querySelector('.mainPageToggle');
  const lunchlist = document.querySelector('.lunchList');
  try {
    if (token) {
      const user = await getUserInfo(token);
      const favorite = await fetchRestaurant(user.favouriteRestaurant);
      let favoriteMenu;
      if (favorite) {
        favoriteMenu = await fetchWeeklyMenu(favorite._id);
      }

      togglediv.innerHTML = `<button class="mainButton" id="closestButton">Lähin ravintola</button>
        <button class="mainButton" id="favouriteButton">
          Suosikki ravintola
        </button>`;
      const closestbtn = togglediv.querySelector('#closestButton');
      const favoritebtn = togglediv.querySelector('#favouriteButton');

      closestbtn.addEventListener('click', () => {
        lunchlist.innerHTML = '';

        renderRestaurantMenu(closest, menu, 'Lähin ravintola');
      });

      favoritebtn.addEventListener('click', () => {
        lunchlist.innerHTML = '';
        if (favorite) {
          if (favoriteMenu.length === 0) {
            lunchlist.innerHTML = `Ei ruokalistaa saatavilla`;
          } else {
            renderRestaurantMenu(favorite, favoriteMenu, 'Suosikki ravintola');
          }
        } else {
          lunchlist.innerHTML =
            'Ei valittua suosikkiravintolaa. Voit valita oman suosikin ravintola- tai profiilisivulla.';
        }
      });
    }
    const allRestaurants = await fetchAllRestaurants();
    const userCoordinates = await getUserLocation();
    const sortedRestaurants = await getSortedRestaurantsByDistance(
      userCoordinates,
      allRestaurants
    );

    const closest = sortedRestaurants[0];
    const menu = await fetchWeeklyMenu(closest._id);
    renderRestaurantMenu(closest, menu, 'Lähin ravintola');
  } catch (error) {
    console.error('Virhe etusivun latauksessa:', error);
  }
});

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
import {getUserInfo} from '../api/user.js';

document.addEventListener('DOMContentLoaded', async () => {
  const nameInput = document.getElementById('name');
  const providerSelect = document.getElementById('provider');
  const citySelect = document.getElementById('city');
  const searchForm = document.querySelector('.searchForm');
  const filterSelect = document.getElementById('filter');
  const token = localStorage.getItem('token');
  let user = null;
  if (token) {
    user = await getUserInfo(token);
  }

  try {
    const allRestaurants = await fetchAllRestaurants();
    const orderByName = allRestaurants.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const providers = [
      ...new Set(orderByName.map((r) => r.company.toLowerCase())),
    ];
    const cities = [...new Set(orderByName.map((r) => r.city.toLowerCase()))];

    providers.forEach((p) => {
      const option = document.createElement('option');
      option.value = p;
      option.textContent = capitalizeFirst(p);
      providerSelect.appendChild(option);
    });

    cities.forEach((c) => {
      const option = document.createElement('option');
      option.value = c;
      option.textContent = capitalizeFirst(c);
      citySelect.appendChild(option);
    });

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = nameInput.value.toLowerCase();
      const provider = providerSelect.value;
      const city = citySelect.value;

      const filtered = allRestaurants.filter((r) => {
        const matchName = r.name.toLowerCase().includes(name);
        const matchProvider = provider
          ? r.company.toLowerCase() === provider
          : true;
        const matchCity = city ? r.city.toLowerCase() === city : true;
        return matchName && matchProvider && matchCity;
      });

      renderFilteredRestaurants(filtered, user.favouriteRestaurant);
    });

    filterSelect.addEventListener('change', async (e) => {
      const sortType = e.target.value;

      let sorted = [...allRestaurants];
      if (sortType === 'alphabetical') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortType === 'location') {
        const userLoc = await getUserLocation();
        sorted = await getSortedRestaurantsByDistance(userLoc, sorted);
      }

      renderFilteredRestaurants(sorted, user?.favouriteRestaurant);
    });

    const dailyMenus = await Promise.all(
      orderByName.map((restaurant) => fetchDailyMenu(restaurant._id))
    );

    const weeklyMenus = await Promise.all(
      orderByName.map((restaurant) => fetchWeeklyMenu(restaurant._id))
    );

    orderByName.forEach((restaurant, index) => {
      const daily = dailyMenus[index];
      const weekly = weeklyMenus[index];
      restaurantDropdown(restaurant, daily, weekly, user?.favouriteRestaurant);
    });
  } catch (error) {
    console.error(error);
  }
});

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function renderFilteredRestaurants(restaurants, favourite) {
  const container = document.querySelector('.restaurantBoxDiv');
  container.innerHTML = '';

  const dailyMenus = await Promise.all(
    restaurants.map((r) => fetchDailyMenu(r._id))
  );
  const weeklyMenus = await Promise.all(
    restaurants.map((r) => fetchWeeklyMenu(r._id))
  );

  restaurants.forEach((r, i) => {
    restaurantDropdown(r, dailyMenus[i], weeklyMenus[i], favourite);
  });
}

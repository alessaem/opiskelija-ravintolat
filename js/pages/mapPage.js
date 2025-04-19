import {fetchAllRestaurants, fetchWeeklyMenu} from '../api/restaurants.js';
import {getUserLocation} from '../utils/locationUtils.js';
import {mapInfo} from '../components/mapInfo.js';

document.addEventListener('DOMContentLoaded', async () => {
  const userCoords = await getUserLocation();

  const map = L.map('mapDiv').setView(
    [userCoords.latitude, userCoords.longitude],
    14
  );
  const light = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
  );
  light.addTo(map);

  const userMarker = L.marker([userCoords.latitude, userCoords.longitude])

    .addTo(map)
    .bindPopup('Sinä olet tässä')
    .openPopup();

  const restaurants = await fetchAllRestaurants();

  restaurants.forEach((restaurant) => {
    const [lon, lat] = restaurant.location.coordinates;
    L.marker([lat, lon])
      .addTo(map)
      .bindPopup(`<strong>${restaurant.name}</strong>`)
      .on('click', async () => {
        try {
          const menu = await fetchWeeklyMenu(restaurant._id);
          mapInfo(restaurant, menu);
        } catch (error) {
          console.error('Failed to fetch the weekly menu:', error);
        }
      });
  });
});

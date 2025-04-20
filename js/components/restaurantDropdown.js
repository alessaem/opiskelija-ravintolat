'use strict';
import {toggleDetails} from '../utils/domUtils.js';
import {saveFavoriteRestaurant} from '../api/user.js';
import {fetchDailyMenu, fetchWeeklyMenu} from '../api/restaurants.js';
import {createWeekMenu} from '../components/weeklyMenu.js';

export function restaurantDropdown(
  restaurant,
  dayMenu = null,
  weekMenu = null,
  favouriteId = null
) {
  const restaurantDiv = document.querySelector('.restaurantBoxDiv');
  const container = document.createElement('div');
  container.className = 'restaurant';
  container.addEventListener('click', async () => {
    toggleDetails(container);
    const dailyMenu = await fetchDailyMenu(restaurant._id);
    createDayMenu(dayMenuContent, dailyMenu);
  });
  const token = localStorage.getItem('token');

  const isFavourite = favouriteId && restaurant._id === favouriteId;
  const heartIcon = isFavourite ? '&#x2665;' : '&#x2661;';
  const heartElement = token
    ? `<span class="favorite-btn" title="Tallenna suosikiksi">${heartIcon}</span>`
    : '';

  container.innerHTML = `
    <div class="header">
      <span>${restaurant.name}</span>
      <div class="header-right">
        <span class="arrow">▶</span>
        ${heartElement}
      </div>
    </div>
    <div class="details">
      <div class="menu-toggle">
        <button class="toggle-day-menu">Näytä päivän ruokalista</button>
        <button class="toggle-week-menu">Näytä viikon ruokalista</button>
      </div>
      <div class="info">
        <p><strong>Sijainti:</strong> ${restaurant.address}, ${restaurant.postalCode} ${restaurant.city}</p>
        <p><strong>Palveluntarjoaja:</strong> ${restaurant.company}</p>
        <p><strong>Yhteystiedot:</strong> ${restaurant.phone}</p>
      </div>
      <div class="day-menu ">
        <p><strong>Päivän ruokalista:</strong></p>
        <div class="day-menu-content">Ladataan...</div>
      </div>
      <div class="week-menu hidden">
        <p><strong>Viikon ruokalista:</strong></p>
        <div class="week-menu-content">Ladataan...</div>
      </div>
    </div>
  `;

  const details = container.querySelector('.details');
  const dayMenuDiv = details.querySelector('.day-menu');
  const weekMenuDiv = details.querySelector('.week-menu');
  const dayMenuContent = dayMenuDiv.querySelector('.day-menu-content');
  const weekMenuContent = weekMenuDiv.querySelector('.week-menu-content');
  const toggleDayMenuButton = details.querySelector('.toggle-day-menu');
  const toggleWeekMenuButton = details.querySelector('.toggle-week-menu');

  toggleDayMenuButton.addEventListener('click', (event) => {
    event.stopPropagation();
    dayMenuDiv.classList.remove('hidden');
    weekMenuDiv.classList.add('hidden');
  });

  toggleWeekMenuButton.addEventListener('click', async (event) => {
    event.stopPropagation();
    weekMenuDiv.classList.remove('hidden');
    dayMenuDiv.classList.add('hidden');

    if (!weekMenuContent.dataset.loaded) {
      try {
        const weeklyMenu = await fetchWeeklyMenu(restaurant._id);
        weekMenuDiv.innerHTML = '';
        createWeekMenu(weeklyMenu, weekMenuDiv);
        weekMenuContent.dataset.loaded = 'true';
      } catch (err) {
        console.error('Error fetching weekly menu:', err);
        weekMenuContent.innerHTML =
          '<p>Virhe ladattaessa viikon ruokalistaa</p>';
      }
    }
  });

  if (token) {
    const favoriteBtn = container.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', async (event) => {
      event.stopPropagation();
      try {
        const response = await saveFavoriteRestaurant(token, restaurant._id);
        console.log(response);
        favoriteBtn.innerHTML = '&#9829;';
      } catch (err) {
        console.error('Virhe suosikin tallennuksessa:', err);
      }
    });
  }

  restaurantDiv.appendChild(container);
}

async function createDayMenu(dayMenuContent, dailyMenu) {
  try {
    dayMenuContent.innerHTML = dailyMenu?.courses?.length
      ? dailyMenu.courses
          .map((course) => {
            let info = `<strong>${course.name}</strong>`;
            if (course.price) {
              info += ` - ${course.price}`;
            }
            if (Array.isArray(course.diets) && course.diets.length > 0) {
              info += ` <span class="diet">${course.diets.join(', ')}</span>`;
            }
            return `<p>${info}</p>`;
          })
          .join('')
      : '<p>Ei päivän ruokalistaa saatavilla</p>';
    dayMenuContent.dataset.loaded = 'true';
  } catch (error) {
    console.error('Error fetching daily menu:', error);
    dayMenuContent.innerHTML = '<p>Virhe ladattaessa päivän ruokalistaa</p>';
  }
}

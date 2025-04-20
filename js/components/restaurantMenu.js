'use strict';
import {toggleDetails} from '../utils/domUtils.js';
import {createWeekMenu} from './weeklyMenu.js';

export function renderRestaurantMenu(restaurant, menu, restaurantype) {
  const container = document.querySelector('.lunchList');
  container.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = `${restaurantype}: ${restaurant.name}, Viikon ruokalista`;
  container.appendChild(title);
  createWeekMenu(menu, container);
}

'use strict';
import {toggleDetails} from '../utils/domUtils.js';

export function renderRestaurantMenu(restaurant, menu) {
  const container = document.querySelector('.lunchList');
  container.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = `${restaurant.name}, Viikon ruokalista`;
  container.appendChild(title);

  const section = document.createElement('section');
  menu.days.forEach((day) => {
    const article = document.createElement('article');
    article.className = 'day';
    const button = document.createElement('button');
    button.className = 'day-header';
    button.innerHTML = `${day.date}`;
    button.addEventListener('click', () => toggleDetails(article));

    const dayDiv = document.createElement('div');
    dayDiv.className = 'day-content';
    const ul = document.createElement('ul');
    ul.className = 'menu-list';
    day.courses.forEach((course) => {
      const li = document.createElement('li');
      let info = `<strong>${course.name}</strong>`;
      if (course.price) {
        info += ` - ${course.price} `;
      }
      if (course.diets) {
        info += ` <span class="diet">${course.diets}</span>`;
      }
      li.innerHTML = info;
      ul.appendChild(li);
    });
    dayDiv.appendChild(ul);
    article.appendChild(button);
    article.appendChild(dayDiv);
    section.appendChild(article);
  });

  container.appendChild(section);
}

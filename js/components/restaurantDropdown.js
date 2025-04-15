'use strict';
import {toggleDetails} from '../utils/domUtils.js';

export function restaurantDropdown(restaurant, dayMenu, weekMenu) {
  const restaurantDiv = document.querySelector('.restaurantBoxDiv');
  const container = document.createElement('div');
  container.className = 'restaurant';
  container.addEventListener('click', () => toggleDetails(container));

  let dayMenuHtml = '';

  if (dayMenu?.courses?.length) {
    dayMenuHtml = dayMenu.courses
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
      .join('');
  } else {
    dayMenuHtml = '<p>Ei päivän ruokalistaa saatavilla</p>';
  }

  let weekMenuDiv = document.createElement('div');
  weekMenuDiv.classList.add('week-menu');
  const section = document.createElement('section');

  if (weekMenu?.days?.length) {
    console.log(weekMenu);
    weekMenu.days.forEach((day) => {
      const article = document.createElement('article');
      article.className = 'day';
      const button = document.createElement('button');
      button.className = 'day-header';
      button.innerHTML = `${day.date}`;
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleDetails(article);
      });

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
    weekMenuDiv.appendChild(section);
  }

  weekMenuDiv.classList.add('hidden');

  container.innerHTML = `
    <div class="header">
          <span>${restaurant.name}</span>
          <span class="arrow">▶</span>
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



          <div class="day-menu">
            <p><strong>Päivän ruokalista:</strong></p>
            ${dayMenuHtml}
          </div>

        </div>
  `;
  container.querySelector('.details').appendChild(weekMenuDiv);
  const dayMenuDiv = container.querySelector('.day-menu');
  const toggleDayMenuButton = container.querySelector('.toggle-day-menu');
  const toggleWeekMenuButton = container.querySelector('.toggle-week-menu');

  toggleDayMenuButton.addEventListener('click', (event) => {
    event.stopPropagation();
    dayMenuDiv.classList.remove('hidden');
    weekMenuDiv.classList.add('hidden');
  });

  toggleWeekMenuButton.addEventListener('click', (event) => {
    event.stopPropagation();
    weekMenuDiv.classList.remove('hidden');
    dayMenuDiv.classList.add('hidden');
  });
  restaurantDiv.appendChild(container);
}

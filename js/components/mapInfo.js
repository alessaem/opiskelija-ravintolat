' use strict';
import {toggleDetails} from '../utils/domUtils.js';

export const mapInfo = (restaurant, menu) => {
  const mapInfo = document.querySelector('.mapInfo');
  mapInfo.innerHTML = '';

  const mapRestaurant = document.createElement('div');
  mapRestaurant.className = 'mapRestaurant';
  mapRestaurant.innerHTML = `
 <p id="name">${restaurant.name}</p>
  <p id="address"><strong>Osoite: </strong>${restaurant.address}, ${restaurant.postalCode} ${restaurant.city}</p>
  <p><strong>Palveluntarjoaja:</strong> ${restaurant.company}</p>
  <p><strong>Yhteystiedot:</strong> ${restaurant.phone}</p>
 `;
  mapInfo.appendChild(mapRestaurant);

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Sulje';
  closeBtn.className = 'close-btn';
  closeBtn.addEventListener('click', () => {
    mapInfo.innerHTML = '';
  });

  mapRestaurant.appendChild(closeBtn);

  const mapMenu = document.createElement('div');
  const section = document.createElement('section');

  if (menu?.days?.length) {
    console.log(menu);
    menu.days.forEach((day) => {
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
    mapMenu.appendChild(section);
  }
  mapInfo.appendChild(mapMenu);
};

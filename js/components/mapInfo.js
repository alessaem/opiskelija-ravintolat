' use strict';
import {toggleDetails} from '../utils/domUtils.js';

export const mapInfo = (restaurant, menu) => {
  const mapInfo = document.querySelector('.mapInfo');
  mapInfo.innerHTML = '';

  if (!restaurant) {
    // Show map instructions
    mapInfo.classList.remove('grid'); // Remove grid layout
    mapInfo.innerHTML = `
      <div id="mapInstruction">
        <p>
          <strong>Valitse ravintola tarkastellaksesi sen tietoja</strong>
        </p>
      </div>
    `;
    return;
  }
  mapInfo.classList.add('grid');
  const mapRestaurant = document.createElement('div');
  mapRestaurant.className = 'mapRestaurant';
  mapRestaurant.innerHTML = `
 <p id="name"><strong>${restaurant.name}</strong></p>
  <p id="address"><strong>Osoite: </strong>${restaurant.address}, ${restaurant.postalCode} ${restaurant.city}</p>
  <p><strong>Palveluntarjoaja:</strong> ${restaurant.company}</p>
  <p><strong>Yhteystiedot:</strong> ${restaurant.phone}</p>
 `;
  mapInfo.appendChild(mapRestaurant);

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = `&#128473;`;
  closeBtn.className = 'close-btn';
  closeBtn.addEventListener('click', () => {
    mapInfo.innerHTML = `<div id="mapInstruction">
            <p >
              <strong>Valitse ravintola tarkastellaksesi sen tietoja</strong>
            </p>
          </div>`;
    mapInfo.classList.remove('grid');
  });

  const mapMenu = document.createElement('div');
  mapMenu.className = 'mapMenu';
  mapMenu.appendChild(closeBtn);
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
  } else {
    const noMenuMessage = document.createElement('p');
    noMenuMessage.textContent = 'Ei ruokalistaa saatavilla';
    mapMenu.appendChild(noMenuMessage);
  }

  mapInfo.appendChild(mapMenu);
};

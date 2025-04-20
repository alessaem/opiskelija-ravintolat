' use strict';
import {toggleDetails} from '../utils/domUtils.js';
import {createWeekMenu} from './weeklyMenu.js';

export const mapInfo = (restaurant, menu) => {
  const mapInfo = document.querySelector('.mapInfo');
  mapInfo.innerHTML = '';

  if (!restaurant) {
    mapInfo.classList.remove('grid');
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
  createWeekMenu(menu, mapMenu);
  mapInfo.appendChild(mapMenu);
};

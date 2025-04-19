'use strict';

export function renderNavbar() {
  const token = localStorage.getItem('token');

  const header = document.querySelector('header');

  const navbarHTML = `
    <nav class="navbar">
      <ul class="nav-links">
        <li><a href="main.html">Etusivu</a></li>
        <li><a href="restaurants.html">Ravintolat</a></li>
        <li><a href="map.html">Kartta</a></li>
      </ul>
      <div class="dropdown">
        <button class="dropbtn">${
          token ? 'Tili ▼' : 'Kirjaudu sisään ▼'
        }</button>
        <div class="dropdown-content">
          ${
            token
              ? `<div class="accountDrop">
                <button class="accountBtn"><a href="profile.html">Profiili</a></button>
              <button class="accountBtn"><a href="#" id="logout-link">Kirjaudu ulos</a></button>
              </div>

            `
              : `
              <form id="login">
                <label for="username">Käyttäjätunnus</label>
                <input type="text" id="loginusername" name="username" required />
                <label for="password">Salasana</label>
                <input type="password" id="loginpassword" name="password" required />
                <button id="log-in-btn">Kirjaudu</button>
              </form>
              <a href="signup.html">Luo uusi käyttäjätunnus</a>
            `
          }
        </div>
      </div>
    </nav>
  `;

  header.innerHTML = navbarHTML;

  // Lisää logout-toiminto, jos käyttäjä on kirjautunut
  if (token) {
    const logoutLink = document.getElementById('logout-link');
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      window.location.href = 'main.html'; // tai login.html, mihin haluat ohjata
    });
  }
}

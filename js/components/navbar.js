'use strict';

export function renderNavbar() {
  const navbarHTML = `
    <nav class="navbar">
      <ul class="nav-links">
        <li><a href="main.html">Etusivu</a></li>
        <li><a href="restaurants.html">Ravintolat</a></li>
        <li><a href="map.html">Kartta</a></li>
      </ul>
      <div class="dropdown">
        <button class="dropbtn">Kirjaudu sisään ▼</button>
        <div class="dropdown-content">
          <form>
            <label for="username">Käyttäjätunnus</label>
            <input type="text" id="username" name="username" required />
            <label for="password">Salasana</label>
            <input type="password" id="password" name="password" required />
            <button id="log-in-btn">Kirjaudu</button>
          </form>
          <a href="signup.html">Luo uusi käyttäjätunnus</a>
        </div>
      </div>
    </nav>
  `;

  const header = document.querySelector('header');
  header.innerHTML = navbarHTML;
}

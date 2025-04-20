import {renderNavbar} from './components/navbar.js';
import {login} from './api/user.js';

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();

  const loginForm = document.getElementById('login');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = loginForm.username.value;
      const password = loginForm.password.value;
      try {
        const result = await login(username, password);
        if (result?.token) {
          localStorage.setItem('token', result.token);

          window.location.href = 'main.html';
        } else {
          alert(result?.message || 'Kirjautuminen epäonnistui');
        }
      } catch (err) {
        console.error('Login error:', err);
        alert('Jotain meni pieleen. Tarkista verkkoyhteys tai tunnukset.');
      }
    });
  }
});

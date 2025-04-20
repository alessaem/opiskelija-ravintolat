'use strict';
import {setupPasswordToggle} from '../utils/domUtils.js';
import {checkUsername, createUser} from '../api/user.js';

const form = document.querySelector('#signupform');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;
  try {
    const availableUsername = await checkUsername(username);
    if (availableUsername.available) {
      const user = await createUser(username, password, email);
      document.querySelector(
        '#signupInfo'
      ).innerHTML = `Käyttäjätunnus luotu onnistuneesti. Voit nyt kirjautua sisään.`;
    } else {
      document.querySelector(
        '#usernameError'
      ).innerHTML = `käyttäjätunnus ${username} on varattu!`;
    }
  } catch (err) {
    console.log('virhe: ', err);
  }
});

setupPasswordToggle('.togglePassword', '.password');

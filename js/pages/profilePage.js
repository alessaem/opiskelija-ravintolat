' use strict';
import {getUserInfo, updateUser, uploadAvatar} from '../api/user.js';

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const avatarInput = document.getElementById('avatar');
  const avatar = document.getElementById('avatarPic');
  const username = document.getElementById('profileUsername');
  const email = document.getElementById('profileEmail');
  const form = document.getElementById('profileForm');

  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      avatar.src = imageUrl;

      avatar.onload = () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      // Lataa uusi kuva vain jos käyttäjä valitsi sellaisen
      let avatarFileName = null;
      const file = avatarInput.files[0];

      if (file) {
        avatarFileName = await uploadAvatar(token, file);
        console.log(avatarFileName);
      }

      const userData = {
        username: username.value,
        email: email.value,
      };

      // Lisää avatar, jos se on valittu
      if (avatarFileName) {
        userData.avatar = avatarFileName.data.avatar;
      }

      const result = await updateUser(token, userData);
      console.log('Päivitys onnistui:', result);
      window.location.reload();
    } catch (err) {
      console.log('Virhe profiilin päivityksessä:', err);
    }
  });

  if (token) {
    const user = await getUserInfo(token);
    console.log(user);

    if (user.avatar) {
      avatar.src = `https://media2.edu.metropolia.fi/restaurant/uploads/${user.avatar}`;
    } else {
      avatar.src = '../../images/anonyme-avatar.svg';
    }

    username.value = user.username;
    email.value = user.email;
  }
});

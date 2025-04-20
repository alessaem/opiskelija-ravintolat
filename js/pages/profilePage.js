' use strict';
import {
  getUserInfo,
  updateUser,
  uploadAvatar,
  deleteUser,
} from '../api/user.js';
import {fetchAllRestaurants, fetchRestaurant} from '../api/restaurants.js';
import {setupPasswordToggle} from '../utils/domUtils.js';

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const avatarInput = document.getElementById('avatar');
  const avatarLabel = document.getElementById('avatarLabel');
  const avatar = document.getElementById('avatarPic');
  const username = document.getElementById('profileUsername');
  const email = document.getElementById('profileEmail');
  const form = document.getElementById('profileForm');
  const select = document.getElementById('favouriteSelect');
  const deleteBtn = document.getElementById('delete-btn');

  if (!token) {
    window.location.href = 'main.html';
  }

  if (deleteBtn) {
    deleteCurrentUser(deleteBtn);
  }

  const restaurants = await fetchAllRestaurants();
  restaurants.forEach((n) => {
    const option = document.createElement('option');
    option.value = n._id;
    option.textContent = n.name;
    select.appendChild(option);
  });

  if (token) {
    const user = await getUserInfo(token);

    if (user.avatar) {
      avatar.src = `https://media2.edu.metropolia.fi/restaurant/uploads/${user.avatar}`;
      avatarLabel.innerHTML = 'Vaihda kuva';
    } else {
      avatar.src = '../../images/anonyme-avatar.svg';
    }

    username.value = user.username;
    email.value = user.email;

    if (user.favouriteRestaurant) {
      const favourite = await fetchRestaurant(user.favouriteRestaurant);
      select.value = favourite._id;
    }
  }

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
      let avatarFileName = null;
      const file = avatarInput.files[0];

      if (file) {
        avatarFileName = await uploadAvatar(token, file);
      }

      const userData = {
        username: username.value,
        email: email.value,
        favouriteRestaurant: select.value,
      };

      const password = form.password?.value;
      if (password && password.trim() !== '') {
        userData.password = password;
      }

      if (avatarFileName) {
        userData.avatar = avatarFileName.data.avatar;
      }

      const result = await updateUser(token, userData);
      window.location.reload();
    } catch (err) {
      console.log('Virhe profiilin päivityksessä:', err);
    }
  });
});

setupPasswordToggle('.togglePassword', '.password');
const deleteCurrentUser = async (button) => {
  button.addEventListener('click', async () => {
    const confirmation = confirm(
      'Haluatko varmasti poistaa tilisi? Tätä toimintoa ei voi peruuttaa.'
    );
    if (confirmation) {
      try {
        const token = localStorage.getItem('token');
        const response = await deleteUser(token);

        if (response.ok) {
          alert('Tilisi on poistettu onnistuneesti.');
          localStorage.removeItem('token');
          window.location.href = 'main.html';
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert(`Virhe tilin poistamisessa: ${error.message}`);
      }
    }
  });
};

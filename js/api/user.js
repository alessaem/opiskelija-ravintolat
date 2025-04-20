'use strict';
import {fetchData} from '../utils/fetchData.js';

export const createUser = async (username, password, email) => {
  try {
    const url = 'https://media2.edu.metropolia.fi/restaurant/api/v1/users';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    };
    const data = await fetchData(url, options);
    console.log(data);
    return data;
  } catch (err) {
    console.log('error: ', err);
  }
};

export const checkUsername = async (username) => {
  try {
    const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/users/available/${username}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = await fetchData(url, options);
    console.log(data);
    return data;
  } catch (err) {
    console.log('error: ', err);
  }
};

export const login = async (username, password) => {
  try {
    const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/auth/login`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    const data = await fetchData(url, options);
    console.log(data);
    return data;
  } catch (err) {
    console.log('error: ', err);
  }
};

export const getUserInfo = async (token) => {
  try {
    const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/users/token`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await fetchData(url, options);
    return data;
  } catch (err) {
    console.log('error: ', err);
  }
};

export const updateUser = async (token, updatedData) => {
  try {
    const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/users`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    };
    const data = await fetchData(url, options);
    console.log(data);
    return data;
  } catch (err) {
    console.log('error: ', err);
  }
};

export const uploadAvatar = async (token, file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  try {
    const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/users/avatar`;
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const data = await fetchData(url, options);
    console.log(data);
    return data;
  } catch (err) {
    console.log('error: ', err);
  }
};

export const saveFavoriteRestaurant = async (token, restaurant_id) => {
  try {
    const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/users`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({favouriteRestaurant: restaurant_id}),
    };
    const data = await fetchData(url, options);
    console.log(data);
    return data;
  } catch (err) {
    console.log('error: ', err);
  }
};

export const deleteUser = async (token) => {
  try {
    const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/users`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (err) {
    console.error('Error in deleteUser:', err);
    throw err;
  }
};

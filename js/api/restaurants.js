'use strict';
import {fetchData} from '../utils/fetchData.js';

export async function fetchAllRestaurants() {
  try {
    const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = await fetchData(url, options);
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}

export async function fetchRestaurant(id) {
  try {
    const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/${id}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = await fetchData(url, options);
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}

export async function fetchDailyMenu(id) {
  try {
    const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${id}/fi`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = await fetchData(url, options);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchWeeklyMenu(id) {
  try {
    const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/weekly/${id}/fi`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = await fetchData(url, options);
    return data;
  } catch (error) {
    console.log(error);
  }
}

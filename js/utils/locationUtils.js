'use strict';

export async function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Selaimesi ei tue paikannusta');
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => reject(err)
    );
  });
}

export function getSortedRestaurantsByDistance(userCoordinates, restaurants) {
  const sortedRestaurants = restaurants
    .map((restaurant) => {
      const [lon, lat] = restaurant.location.coordinates;
      const distance = Math.sqrt(
        Math.pow(lat - userCoordinates.latitude, 2) +
          Math.pow(lon - userCoordinates.longitude, 2)
      );
      return {...restaurant, distance};
    })
    .sort((a, b) => a.distance - b.distance);
  return sortedRestaurants;
}

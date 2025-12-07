export const get_nearby_places = async function get_nearby_places({ lat, lng, category }) {
  const apiKey = '9a4f6e65f564430cb664ffca643d35c5';

  const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lng},${lat},4000&limit=10&apiKey=${apiKey}`;
//   https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect%3A10.716463143326969%2C48.755151258420966%2C10.835314015356737%2C48.680903341613316&limit=20&apiKey=9a4f6e65f564430cb664ffca643d35c5

  const response = await fetch(url);
  const data = await response.json();
  console.log(data)

  return data.features.map(place => ({
    name: place.properties.name,
    address: place.properties.formatted,
    distance: place.properties.distance,
  }));
}

// export get_nearby_places
// get_nearby_places({ lat: 28.714759, lng: 77.1370003, category: 'commercial.supermarket' });

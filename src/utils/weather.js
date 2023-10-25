require("dotenv").config();

async function getWeatherDetails(lat, lon) {
  const path = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`;
  const response = await fetch(path);
  const jsonResponse = await response.json();
  return jsonResponse;
}

async function getWeatherForecast(lat, lon) {
  const path = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric&cnt=7`;
  const response = await fetch(path);
  const jsonResponse = await response.json();
  return jsonResponse.list;
}

async function getLocation(location) {
  const path = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.API_KEY}`;
  const response = await fetch(path);
  const [jsonResponse] = await response.json();
  if (!jsonResponse) {
    throw new Error(`404 - Can't find "<u>${location}</u>" location`);
  }
  return jsonResponse;
}

module.exports = { getWeatherDetails, getLocation, getWeatherForecast };

require("dotenv").config();
const locationPath =
  "http://api.openweathermap.org/geo/1.0/direct?q=rome, us&appid=675ccc997f8b0b7fc90134668d423257";
const currentPath =
  "https://api.openweathermap.org/data/2.5/weather?lat=43.2128473&lon=-75.4557304&appid=675ccc997f8b0b7fc90134668d423257&units=metric";
const forecastPath =
  "https://api.openweathermap.org/data/2.5/forecast?lat=-7.8011945&lon=110.364917&appid=675ccc997f8b0b7fc90134668d423257&units=metric&cnt=7";
// fetch(currentPath)
//   .then((res) => res.json())
//   .then((res) => {
//     // const [current] = res;
//     console.log(res);
//   });

// const date = new Date().getTimezoneOffset() / 60;
// console.log(date);
// console.log(new Date().);

// navigator.geolocation.getCurrentPosition((pos) => {
//   const crd = pos.coords;
//   console.log("lat" + crd.latitude);
//   console.log("lan" + crd.longitude);
// });
async function getWeatherDetails(lat, lon) {
  const path = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=675ccc997f8b0b7fc90134668d423257&units=metric`;
  const response = await fetch(path);
  const jsonResponse = await response.json();
  return jsonResponse;
}

async function getWeatherForecast(lat, lon) {
  const path = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=675ccc997f8b0b7fc90134668d423257&units=metric&cnt=7`;
  const response = await fetch(path);
  const jsonResponse = await response.json();
  return jsonResponse.list;
}

// const location = "roma";
async function getLocation(location) {
  const path = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=675ccc997f8b0b7fc90134668d423257`;
  const response = await fetch(path);
  const [jsonResponse] = await response.json();
  if (!jsonResponse) {
    throw new Error(`404 - Can't find "<u>${location}</u>" location`);
  }
  return jsonResponse;
}

module.exports = { getWeatherDetails, getLocation, getWeatherForecast };

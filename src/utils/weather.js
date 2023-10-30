require("dotenv").config();

async function getWeatherDetails(lat, lon) {
  const path = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`;
  const response = await fetch(path);
  const jsonResponse = await response.json();
  return jsonResponse;
}

async function getWeatherForecast(lat, lon) {
  const path = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric&cnt=16`;
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

// ==== Weather Dynamic Value =====

function printTemplateWeather(weatherDetails, weatherForecast, searchLocation) {
  const { name, main, weather, clouds, wind, sys, dt, timezone } =
    weatherDetails;

  const localTime = new Date((dt + timezone) * 1000);

  const [day, date, month, year] = localTime.toUTCString().split(" ");
  const hour = localTime.getUTCHours();
  const minute = localTime.getUTCMinutes();

  // for weather forecast follow GMT local
  const GMTHours = new Date().getUTCHours();
  const localGMT = timezone / 3600;

  const forecastIndex = getForecastIndex(GMTHours, localGMT);

  function getForecastIndex(GMTHours, localGMT) {
    if (GMTHours % 3 == 0) {
      return Math.floor(localGMT / 3);
    } else if (GMTHours % 3 == 1) {
      return Math.round(localGMT / 3);
    } else if (GMTHours % 3 == 2) {
      return Math.ceil(localGMT / 3);
    }
  }

  function getForecastHour(index) {
    return weatherForecast[index].dt_txt.split("").slice(11, 13).join(""); // 2023-10-27 06:00:00 => "06"
  }

  return {
    loading: false, // for loading automatic find weather in your location
    weatherMain: weather[0].main,
    mainInfo: {
      temp: Math.round(main.temp),
      calendar: {
        hour: hour < 10 ? `0${hour}` : `${hour}`,
        minute: minute < 10 ? `0${minute}` : `${minute}`,
        day,
        date,
        month,
        year,
      },
      city: searchLocation ? searchLocation.name : name,
      country: searchLocation ? searchLocation.country : sys.country,
      icon: weather[0].icon,
    },
    weatherDetails: {
      desc: weather[0].description || "kakaak",
      tempMax: Math.round(main.temp_max),
      tempMin: Math.round(main.temp_min),
      humidity: main.humidity,
      cloudy: clouds.all,
      wind: Math.round(wind.speed),
    },
    weatherForecast: {
      one: {
        main: weatherForecast[forecastIndex].weather[0].main,
        icon: weatherForecast[forecastIndex].weather[0].icon,
        temp: Math.round(weatherForecast[forecastIndex].main.temp),
        hour: getForecastHour(forecastIndex),
      },
      two: {
        main: weatherForecast[forecastIndex + 1].weather[0].main,
        icon: weatherForecast[forecastIndex + 1].weather[0].icon,
        temp: Math.round(weatherForecast[forecastIndex + 1].main.temp),
        hour: getForecastHour(forecastIndex + 1),
      },
      three: {
        main: weatherForecast[forecastIndex + 2].weather[0].main,
        icon: weatherForecast[forecastIndex + 2].weather[0].icon,
        temp: Math.round(weatherForecast[forecastIndex + 2].main.temp),
        hour: getForecastHour(forecastIndex + 2),
      },
      four: {
        main: weatherForecast[forecastIndex + 3].weather[0].main,
        icon: weatherForecast[forecastIndex + 3].weather[0].icon,
        temp: Math.round(weatherForecast[forecastIndex + 3].main.temp),
        hour: getForecastHour(forecastIndex + 3),
      },
      five: {
        main: weatherForecast[forecastIndex + 4].weather[0].main,
        icon: weatherForecast[forecastIndex + 4].weather[0].icon,
        temp: Math.round(weatherForecast[forecastIndex + 4].main.temp),
        hour: getForecastHour(forecastIndex + 4),
      },
    },
  };
}

module.exports = {
  getWeatherDetails,
  getLocation,
  getWeatherForecast,
  printTemplateWeather,
};

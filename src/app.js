const express = require("express");
const path = require("path");
require("dotenv").config();
// const { redirect } = require("express/lib/response");

const {
  getWeatherDetails,
  getLocation,
  getWeatherForecast,
} = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

function printTemplateWeather(weatherDetails, weatherForecast, searchLocation) {
  const { name, main, weather, clouds, wind, sys, dt, timezone } =
    weatherDetails;

  const localTime = new Date((dt + timezone) * 1000);

  const [day, month, date, year] = localTime.toUTCString().split(" ");
  const hour = localTime.getUTCHours();
  const minute = localTime.getUTCMinutes();

  console.log(weatherForecast[0].dt_txt);

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
        day: searchLocation ? day : `${day},`,
        date,
        month,
        year: searchLocation ? year : year.split("").slice(2, 4).join(""),
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
        main: weatherForecast[0].weather[0].main,
        icon: weatherForecast[0].weather[0].icon,
        temp: Math.round(weatherForecast[0].main.temp),
        hour: getForecastHour(0),
      },
      two: {
        main: weatherForecast[1].weather[0].main,
        icon: weatherForecast[1].weather[0].icon,
        temp: Math.round(weatherForecast[1].main.temp),
        hour: getForecastHour(1),
      },
      three: {
        main: weatherForecast[2].weather[0].main,
        icon: weatherForecast[2].weather[0].icon,
        temp: Math.round(weatherForecast[2].main.temp),
        hour: getForecastHour(2),
      },
      four: {
        main: weatherForecast[3].weather[0].main,
        icon: weatherForecast[3].weather[0].icon,
        temp: Math.round(weatherForecast[3].main.temp),
        hour: getForecastHour(3),
      },
      five: {
        main: weatherForecast[4].weather[0].main,
        icon: weatherForecast[4].weather[0].icon,
        temp: Math.round(weatherForecast[4].main.temp),
        hour: getForecastHour(4),
      },
      six: {
        main: weatherForecast[5].weather[0].main,
        icon: weatherForecast[5].weather[0].icon,
        temp: Math.round(weatherForecast[5].main.temp),
        hour: getForecastHour(5),
      },
      seven: {
        main: weatherForecast[6].weather[0].main,
        icon: weatherForecast[6].weather[0].icon,
        temp: Math.round(weatherForecast[6].main.temp),
        hour: getForecastHour(6),
      },
    },
  };
}

app.get("/", async (req, res) => {
  res.render("current-location", { loading: true });
});

app.post("/", async (req, res) => {
  const { currentlat, currentlon, location } = req.body;

  // ===== automatic find weather in your location ======
  if (currentlat) {
    try {
      const weatherDetails = await getWeatherDetails(currentlat, currentlon);
      const weatherForecast = await getWeatherForecast(currentlat, currentlon);

      res.render(
        "index",
        printTemplateWeather(weatherDetails, weatherForecast)
      );
    } catch (err) {
      res.status(404);
      res.send(`<h1>${err}</h1>`);
    }

    // ====== search manual weather on input search =======
  } else if (location) {
    try {
      const searchLocation = await getLocation(location);
      const { lat, lon } = searchLocation;

      const weatherDetails = await getWeatherDetails(lat, lon);
      const weatherForecast = await getWeatherForecast(lat, lon);

      res.render(
        "index",
        printTemplateWeather(weatherDetails, weatherForecast, searchLocation)
      );
    } catch (err) {
      res.status(404);
      res.send(`<h1>${err}</h1>`);
    }
  }
});

app.listen(port, () => {
  console.log(`Your app listening at http://localhost:${port}`);
});

// module.exports = app;

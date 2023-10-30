const express = require("express");
const path = require("path");
require("dotenv").config();
// const { redirect } = require("express/lib/response");

const {
  getWeatherDetails,
  getLocation,
  getWeatherForecast,
  printTemplateWeather,
} = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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
    const searchLocation = await getLocation(location);
    const { lat, lon } = searchLocation;

    const weatherDetails = await getWeatherDetails(lat, lon);
    const weatherForecast = await getWeatherForecast(lat, lon);

    res.render(
      "index",
      printTemplateWeather(weatherDetails, weatherForecast, searchLocation)
    );
    try {
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

const weatherMain = document.getElementById("bg-img").value; // get main weather
const getDay = document.getElementById("day").value.split("").pop(); // get day or night
const bgImg = `${weatherMain} ${getDay}`; // result example "Rain n" / "Thunderstrom d"

function changeBackgroundImg() {
  switch (bgImg) {
    case "Thunderstorm d":
    case "Thunderstorm n":
      document.body.style.setProperty(
        "--background-image",
        `url("/img/bg/thunderstorm.jpg")`
      );
      break;
    case "Snow d":
    case "Snow n":
      document.body.style.setProperty(
        "--background-image",
        `url("/img/bg/snow.jpg")`
      );
      break;
    case "Rain d":
    case "Rain n":
    case "Drizzle d":
    case "Drizzle n":
      document.body.style.setProperty(
        "--background-image",
        `url("/img/bg/rain.jpg")`
      );
      break;
    case "Clear d":
      document.body.style.setProperty(
        "--background-image",
        `url("/img/bg/clear.jpg")`
      );
      break;
    case "Clear n":
      document.body.style.setProperty(
        "--background-image",
        `url("/img/bg/night.jpg")`
      );
      break;
    case "Clouds d":
      document.body.style.setProperty(
        "--background-image",
        `url("/img/bg/clouds.jpg")`
      );
      break;
    case "Clouds n":
      document.body.style.setProperty(
        "--background-image",
        `url("/img/bg/clouds-night.jpg")`
      );
      break;
    default:
      document.body.style.setProperty(
        "--background-image",
        `url("/img/bg/mist.jpg")`
      );
  }
}

export { changeBackgroundImg };

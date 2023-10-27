// ===== get your location coordinate ====
const currentBtn = document.getElementById("current-weather");
const currentLat = document.getElementById("current-lat");
const currentLon = document.getElementById("current-lon");

if (!navigator.geolocation) {
  if (currentLat.value == "") {
    currentLat.value = "51.5073219";
    currentLon.value = "-0.1276474";
  }
}

function success(pos) {
  const crd = pos.coords;
  currentLat.value = crd.latitude ? crd.latitude : "51.5073219";
  currentLon.value = crd.longitude ? crd.longitude : "-0.1276474";

  currentBtn.click();
}
function getDefaultLocation() {
  if (currentLat.value == "") {
    currentLat.value = "51.5073219";
    currentLon.value = "-0.1276474";
  }
  currentBtn.click();
  alert("please activate your location to get weather at your location");
}

function getYourLocation() {
  navigator.geolocation.getCurrentPosition(success, getDefaultLocation, {
    enableHighAccuracy: true,
  });
}

export { getYourLocation };

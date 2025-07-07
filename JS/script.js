

const apiKey = "f7ce1cdf92144b4a8b7141816250707";
let city = '';

// Main function to initialize weather app
async function initWeatherApp() {
  try {
    city = await getCurrentCity();
    await getWeather();
  } catch (error) {
    console.error("Initialization error:", error);
    city = "Alexandria";
    await getWeather();
  }
}

// Get current city using geolocation
async function getCurrentCity() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const city = await reverseGeocode(position.coords.latitude, position.coords.longitude);
          resolve(city);
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(`Location access denied: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

// Reverse geocoding with fallback to nearest city
async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    if (!response.ok) throw new Error('Geocoding failed');

    const data = await response.json();
    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      await getNearestCity(lat, lng) || // fallback
      'Unknown location'
    );
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    throw error;
  }
}

// Get nearest city from WeatherAPI if Nominatim fails
async function getNearestCity(lat, lon) {
  const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${lat},${lon}`);
  if (!response.ok) throw new Error("Nearest city fetch failed");

  const data = await response.json();
  if (data.length > 0) return data[0].name;
  return null;
}

// Display weather data
function Display(data) {
  const todayDate = new Date(data.location.localtime);
  const tomorrowDate = new Date(data.forecast.forecastday[1].date);
  const dayAfterTomorrowDate = new Date(data.forecast.forecastday[2].date);

  // Today
  document.getElementById('today').innerHTML = `
    <div class="card-header d-flex justify-content-between">
      <small>${todayDate.toLocaleString('default', { weekday: 'long' })}</small>
      <small>${todayDate.getDate()} ${todayDate.toLocaleString('default', { month: 'long' })}</small>
    </div>
    <div class="card-body p-3 fourth_background">
      <h5 class="card-title">${data.location.name}</h5>
      <div class="d-flex align-items-center gap-3">
        <h1 class="fw-bold" style="font-size: 90px;">${data.current.temp_c} <sup>o</sup>C</h1>
        <img src="${data.current.condition.icon}" alt="weather icon">
      </div>
      <p class="second_color">${data.current.condition.text}</p>
      <div class="d-flex gap-3 mt-3">
        <div class="d-flex align-items-center gap-2">
          <img src="Images/icon-umberella.png" alt="">
          <p class="pt-3">${data.current.humidity}%</p>
        </div>
        <div class="d-flex align-items-center gap-2">
          <img src="Images/icon-wind.png" alt="">
          <p class="pt-3">${data.current.wind_kph}km/h</p>
        </div>
        <div class="d-flex align-items-center gap-2">
          <img src="Images/icon-compass.png" alt="">
          <p class="pt-3">${data.current.wind_dir}</p>
        </div>
      </div>
    </div>
  `;

  // Tomorrow
  document.getElementById('tomorrow').innerHTML = `
    <div class="card-header text-center">
      ${tomorrowDate.toLocaleString('default', { weekday: 'long' })}
    </div>
    <div class="card-body fourth_background text-center p-3">
      <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="weather icon">
      <h1 class="fw-bold">${data.forecast.forecastday[1].day.avgtemp_c} <sup>o</sup>C</h1>
      <p class="second_color">${data.forecast.forecastday[1].day.condition.text}</p>
    </div>
  `;

  // Day After Tomorrow
  document.getElementById('dayAfterTomorrow').innerHTML = `
    <div class="card-header text-center">
      ${dayAfterTomorrowDate.toLocaleString('default', { weekday: 'long' })}
    </div>
    <div class="card-body fourth_background text-center p-3">
      <img src="${data.forecast.forecastday[2].day.condition.icon}" alt="weather icon">
      <h1 class="fw-bold">${data.forecast.forecastday[2].day.avgtemp_c} <sup>o</sup>C</h1>
      <p class="second_color">${data.forecast.forecastday[2].day.condition.text}</p>
    </div>
  `;
}



// Fetch and display weather based on current city
async function getWeather() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    Display(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Search for city weather based on user input
async function searchWeather() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${city}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    city = data[0].name;
    getWeather();
  } catch (error) {
    console.error("Error searching weather data:", error);
  }
}

// User search input listener
document.getElementById('searchInput').addEventListener('keyup', function () {
  const input = document.getElementById('searchInput').value.trim();
  if (input) {
    city = input;
    searchWeather();
  }
});

// Start the weather app
initWeatherApp();

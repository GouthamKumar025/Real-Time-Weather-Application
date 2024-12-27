const weather_container = document.querySelector(".weather-container");
const city_name = document.getElementById("city");
const forecast_date = document.getElementById("forecast");
const submit_btn = document.getElementById("submit");
const weather_dash = document.querySelector(".weather-dashboard");
const close_btn = document.getElementById("close");
const location_name = document.querySelector(".location-time");
const overall_temp = document.querySelector(".temp");
const uv = document.getElementById("uv-li");
const humidity = document.getElementById("hum-li");
const precip = document.getElementById("precip-li");
const wind = document.getElementById("wind-li");

let weather_data = [];

submit_btn.addEventListener("click", function (event) {
  event.preventDefault();

  const city = city_name.value;

  if (city) {
    const api_key = "d683ff6d5ec14060bfc55340242212";
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=3`;
    getWeather(url);
    weather_dash.style.display = "block";
    weather_container.style.display = "none";
    city_name.value = "";
  }
});

async function getWeather(url) {
  try {
    const response = await fetch(url);
    weather_data = await response.json();
    displayWeatherDetails(weather_data);
    console.log(weather_data);
  } catch (error) {
    console.log("Error occured");
  }
}

function displayWeatherDetails(weather_data) {
  location_name.textContent = weather_data.location.name;
  overall_temp.textContent = Math.round(weather_data.current.temp_c);
  uv.textContent = weather_data.current.uv;
  humidity.textContent = weather_data.current.humidity;
  precip.textContent = weather_data.current.precip_mm;
  wind.textContent = weather_data.current.wind_kph;
  const forecastDays = weather_data.forecast.forecastday;
  const forecastBar = document.querySelector(".forecast-bar");

  forecastBar.innerHTML = "";

  const weatherIcons = {
    sunny: "sunny.svg",
    cloudy: "cloudy.svg",
    heavyrain: "heavy-rain.svg",
    rain: "rainy.svg",
    overcast: "cloudy.svg",
    moderaterain: "rainy.svg",
    patchyrainnearby: "rainy.svg",
  };

  forecastDays.forEach((day) => {
    const tempInfoBox = document.createElement("div");
    tempInfoBox.classList.add("temp-info-box");

    const dateElement = document.createElement("p");
    dateElement.textContent = day.date;

    const weatherIcon = document.createElement("img");
    weatherIcon.classList.add("weather-icon");
    const conditionText = day.day.condition.text
      .toLowerCase()
      .replace(/\s+/g, "");
    const iconFile = weatherIcons[conditionText] || "sunny.svg";
    weatherIcon.src = `assets/${iconFile}`;

    const tempElement = document.createElement("p");
    tempElement.textContent = `${day.day.avgtemp_c}° C`; // Average temperature

    tempInfoBox.appendChild(dateElement);
    tempInfoBox.appendChild(weatherIcon);
    tempInfoBox.appendChild(tempElement);

    forecastBar.appendChild(tempInfoBox);
    console.log("Condition text:", conditionText);
  });
  console.log(weather_data.location.name);
}

close_btn.addEventListener("click", (e) => {
  weather_dash.style.display = "none";
  weather_container.style.display = "block";
});

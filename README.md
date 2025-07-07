# 🌦️ Weather App

A responsive weather application built with **HTML, CSS (Bootstrap)**, and **JavaScript**. It fetches weather forecast data using the [WeatherAPI](https://www.weatherapi.com/) and displays it for **today**, **tomorrow**, and **the day after tomorrow** in a modern card layout using Bootstrap's `card-group`.

![Weather App Screenshot](preview.png) <!-- optional: replace with your own screenshot -->

---

## 📦 Features

- 🔍 **Auto-detects user location** using Geolocation API.
- 🗺️ **Reverse geocoding** using [OpenStreetMap Nominatim API].
- 📡 **Fetches real-time weather data** from [WeatherAPI].
- 📆 **Displays 3-day forecast**:
  - Today’s temperature, condition, wind speed, humidity, and wind direction.
  - Tomorrow and the day after: average temperature & forecast.
- 🧩 **Bootstrap card-group** layout for modern, responsive design.
- 🌙 Fallback to a default city (`Alexandria`) if location is blocked or unavailable.
- 📱 Mobile responsive.

---

## 🛠️ Technologies Used

- HTML5 / CSS3
- Bootstrap 5
- JavaScript ES6+
- [WeatherAPI](https://www.weatherapi.com/)
- [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app

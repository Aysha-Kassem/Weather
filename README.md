# 🌦️ Weather App

A responsive weather application built with **HTML, CSS (Bootstrap)**, and **JavaScript**. It fetches weather forecast data using the [WeatherAPI](https://www.weatherapi.com/) and displays it for **today**, **tomorrow**, and **the day after tomorrow** in a modern card layout using Bootstrap's `card-group`.

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
```
### 2. Open index.html in your browser
No backend or build tools required — it's pure frontend!

---

### 🔑 API Keys
You’ll need a free WeatherAPI key to run the app.

Sign up at WeatherAPI.com
Replace the placeholder in the code:
```bash
const apiKey = "your_weatherapi_key_here";
```
---

### 📂 Folder Structure
```bash
weather-app/
│
├── index.html
├── style.css
├── script.js
├── Images/
│   ├── icon-umberella.png
│   ├── icon-wind.png
│   └── icon-compass.png
└── README.md
```
---

### 📸 UI Preview
Weather cards for Today, Tomorrow, and Day After Tomorrow.

---
### ⚠️ Notes
- If the user denies geolocation, the app will fallback to "Alexandria".
- Ensure your browser supports Geolocation and fetch().
- Works without any frameworks, but relies on Bootstrap 5 and the two APIs.

---
### 🙋‍♀️ Author
Aysha Kassem
If you enjoyed this project or have questions, feel free to reach out!

# Weather App 

This is a **React-based weather application** that provides real-time weather updates for the user's **current location**, 5-day forecast, and **historical weather data** for any city.

##  Features

-  **Auto Detect Location**: Uses the browser's Geolocation API to fetch weather for your current location.
-  **Search by City**: Instantly search and view weather data for any city.
-  **5-Day Forecast**: Displays upcoming weather with icons and temperature.
- **Weather History**: Enter a date to view past weather for any city.
-  **Auto Refresh**: Updates current weather every 5 minutes.
-  **Error Handling**: Friendly messages when there's an API or geolocation error.

---

## Technologies Used

- **React** – For building the UI
- **WeatherAPI** – For real-time and historical weather data
- **Geolocation API** – For detecting user location
- **CSS** – Custom styling

---

## Folder Structure (Recommended)
weather-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── WeatherCard/
│   │   │   ├── WeatherCard.jsx
│   │   │   └── WeatherCard.css
│   │   ├── WeatherList/
│   │   │   ├── WeatherList.jsx
│   │   │   └── WeatherList.css
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.jsx
│   │   │   └── SearchBar.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   └── Loader/
│   │       ├── Loader.jsx
│   │       └── Loader.css
│   ├── services/
│   │   └── weatherService.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── README.md
└── .gitignore

- **WeatherCard** 
- Acts as a presentational component that displays weather data for a single day
- Creates a visually consistent card layout for each day's forecast

- **WeatherList Component** 
- Acts as a container component that manages multiple WeatherCards
- Orchestrates the display of the entire forecast collection

---

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


 ### Prerequisites

- Node.js & npm installed
### Installation
--- 

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
npm install

----
### To run app
npm start

### Open WeatherList.js and replace with your own API key from WeatherAPI:
const API_KEY = 'your_api_key_here';

### Scripts
In the project directory, you can run:

npm start – Runs the app in development mode.

npm run build – Builds the app for production.

npm test – Launches the test runner in interactive watch mode.

npm run eject – Copies config files to give you full control (irreversible).

### Deployment : To build and deploy the app
npm run build

### Learn More
React Docs

WeatherAPI Docs

Create React App Doc

### Author
 Contact: varshithreddyreddy873@gmail.com
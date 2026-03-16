// ============================================
// Weather CLI Application
// A simple Node.js CLI tool to check weather
// ============================================

// 1. GET CITY NAME FROM COMMAND LINE ARGUMENTS
const cityName = process.argv.slice(2).join(" ").trim();

// 2. VALIDATE: Check if city name was provided
if (!cityName) {
  console.log("Please provide a city name. Example: node index.js \"Los Angeles\"");
  process.exit(1);
}

// 3. POLYFILL: Node versions before 18 don't have global fetch
let fetchFn;
if (typeof fetch !== "undefined") {
  fetchFn = fetch;
} else {
  try {
    fetchFn = require("node-fetch");
  } catch (err) {
    console.error("This app requires Node 18+ or install node-fetch for older Node versions.");
    console.error("Run: npm install node-fetch");
    process.exit(1);
  }
}

// 4. MAIN FUNCTION: Fetch and display weather
async function getWeather(city) {
  try {
    const geoResponse = await fetchFn(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&language=en&format=json`
    );

    if (!geoResponse.ok) {
      throw new Error(`Geocoding API returned ${geoResponse.status}`);
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      console.log("City not found. Please check the city name and try again.");
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherResponse = await fetchFn(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`
    );

    if (!weatherResponse.ok) {
      throw new Error(`Weather API returned ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();

    if (!weatherData.current) {
      throw new Error("Weather API did not return current weather right now.");
    }

    const { temperature_2m: temperature, relative_humidity_2m: humidity, weather_code: weatherCode } = weatherData.current;

    const weatherDescription = getWeatherDescription(weatherCode);

    console.log(`\nWeather in ${name}, ${country}:`);
    console.log(`  Temperature: ${temperature}°C`);
    console.log(`  Condition: ${weatherDescription}`);
    console.log(`  Humidity: ${humidity}%\n`);
  } catch (error) {
    console.error("Unable to fetch weather data.");
    console.error(error.message || error);
  }
}

// 5. HELPER FUNCTION: Convert weather codes to descriptions
function getWeatherDescription(code) {
  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return weatherCodes[code] || "Unknown condition";
}

// 6. RUN THE APPLICATION
getWeather(cityName);

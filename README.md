# Weather CLI Application

A simple, beginner-friendly Node.js command-line tool to check weather information for any city in the world.

## Features

✅ **No API Key Required** - Uses the free Open-Meteo Weather API  
✅ **Simple to Use** - Just run one command to get weather  
✅ **Beginner Friendly** - Clean code with detailed comments  
✅ **Error Handling** - Handles missing cities and network errors gracefully  
✅ **Fast & Lightweight** - Minimal dependencies  

## Requirements

- **Node.js** version 18.0.0 or higher (to use native `fetch` API)
- **npm** or **yarn** for package management

### Check Your Node.js Version

Open your terminal and run:

```bash
node --version
```

If your version is below 18, download the latest version from [nodejs.org](https://nodejs.org/)

## Installation

### Step 1: Navigate to the Project Directory

```bash
cd "path\to\weather app"
```

Or if you're already in the project folder, just open a terminal there.

### Step 2: Install Dependencies

Since this app uses only built-in Node.js features (no external packages), you technically don't need to install anything!

However, if you want to follow best practices, run:

```bash
npm install
```

This doesn't install any packages (since we don't have any in `package.json`), but it ensures the `package.json` file is validated.

## Usage

### Basic Command

```bash
node index.js "City Name"
```

### Examples

```bash
node index.js "London"
node index.js "New York"
node index.js "Tokyo"
node index.js "Paris"
```

**Note:** The city name is case-insensitive. You can use "london", "LONDON", or "London" - they all work!

### Example Output

```
Weather in London, United Kingdom:
  Temperature: 12°C
  Condition: Partly cloudy
  Humidity: 65%
```

## Error Handling

### Error 1: No City Provided

```bash
node index.js
```

**Output:**
```
Please provide a city name.
```

**Fix:** Always provide a city name as an argument.

### Error 2: City Not Found

```bash
node index.js "InvalidCityXYZ"
```

**Output:**
```
City not found.
```

**Fix:** Check the spelling and try again.

### Error 3: Network Error

If your internet connection fails:

**Output:**
```
Unable to fetch weather data.
```

**Fix:** Check your internet connection and try again.

## How It Works

The application works in 5 simple steps:

1. **Gets the city name** from your command-line argument
2. **Validates input** - checks if you provided a city name
3. **Finds the city** - uses the Open-Meteo Geocoding API to get latitude and longitude
4. **Fetches weather** - gets real-time weather data for those coordinates
5. **Displays results** - shows temperature, weather condition, and humidity

## API Information

### Open-Meteo Weather API

- **Website:** [open-meteo.com](https://open-meteo.com)
- **Documentation:** [open-meteo.com/en/docs](https://open-meteo.com/en/docs)
- **Cost:** Completely FREE - no API key required!
- **Rate Limit:** 10,000 requests per day (more than enough for personal use)

### Endpoints Used

1. **Geocoding API** - Convert city name to coordinates:
   ```
   https://geocoding-api.open-meteo.com/v1/search?name={city}
   ```

2. **Weather API** - Get current weather for coordinates:
   ```
   https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=...
   ```

## Project Structure

```
weather app/
├── package.json        # Project metadata and configuration
├── index.js           # Main application file
└── README.md          # This file
```

## Code Explanation

### Key Sections in `index.js`

#### Section 1: Get City Name
```javascript
const cityName = process.argv[2];
```
Extracts the city name from command-line arguments.

#### Section 2: Validate Input
```javascript
if (!cityName) {
  console.log("Please provide a city name.");
  process.exit(1);
}
```
Ensures a city name was provided before proceeding.

#### Section 3: Main Function
```javascript
async function getWeather(city) {
  // Fetch geocoding data
  // Fetch weather data
  // Display results
}
```
Uses `async/await` for clean, readable asynchronous code.

#### Section 4: Error Handling
```javascript
try {
  // API calls
} catch (error) {
  console.log("Unable to fetch weather data.");
}
```
Catches and handles any errors gracefully.

## Troubleshooting

### "node: command not found"
- Node.js is not installed or not in your system PATH
- **Solution:** Download and install Node.js from [nodejs.org](https://nodejs.org/)

### "City not found" for a valid city
- The API uses standardized city names
- **Solution:** Try using the capital/main city of that country

### Getting no output
- Check your internet connection
- **Solution:** Test with `ping 8.8.8.8` in your terminal

### "Cannot find module" errors
- This shouldn't happen as we use only built-in Node features
- **Solution:** Delete `node_modules` directory and run `npm install` again

## Learning Points

This project is great for learning:

- ✅ Command-line arguments in Node.js (`process.argv`)
- ✅ `async/await` syntax
- ✅ Using the native Fetch API
- ✅ Parsing JSON responses
- ✅ Error handling in JavaScript
- ✅ Making HTTP requests
- ✅ Working with external APIs
- ✅ String interpolation and template literals

## Next Steps / Enhancements

Once you're comfortable with this app, here are some ideas to extend it:

1. **Add Temperature Unit Toggle** - Allow Fahrenheit and Celsius
2. **Find Nearest Cities** - Show multiple results if ambiguous
3. **Save Favorite Cities** - Cache results locally
4. **Weather Alerts** - Add warnings for extreme weather
5. **Use a Different API** - Try OpenWeatherMap or WeatherAPI
6. **Add Tests** - Write unit tests with Jest
7. **Create a Web Version** - Convert to a web application using Express.js

## License

This project is open source and available for anyone to use and modify.

---

**Happy coding!** 🌦️

For questions or improvements, feel free to modify the code and experiment!

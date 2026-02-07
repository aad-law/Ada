const axios = require('axios');

class WeatherCommand {
  constructor() {
    // Using free wttr.in service (no API key needed!)
    this.baseUrl = 'https://wttr.in';
  }

  async getWeather(location = '') {
    try {
      const url = `${this.baseUrl}/${location}?format=j1`;
      const response = await axios.get(url);
      const data = response.data;

      const current = data.current_condition[0];
      const area = data.nearest_area[0];
      
      return `The weather in ${area.areaName[0].value} is ${current.weatherDesc[0].value}. Temperature: ${current.temp_C}°C (${current.temp_F}°F). Humidity: ${current.humidity}%.`;
    } catch (error) {
      return "I couldn't fetch the weather data. Please try again.";
    }
  }
}

module.exports = WeatherCommand;
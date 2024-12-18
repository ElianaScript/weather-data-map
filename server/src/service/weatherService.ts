import dotenv from 'dotenv';
dotenv.config();

interface Coordinates {
  latitude: number;
  longitude: number;
};

constructor (latitude: number, longitude: number;) {
  this.latitude = latitude;
  this.longitude = longitude;
}

class Weather {
  temperature!: number;
  wind!: number;
  humidity!: number;
};

constructor (temperature: number, wind: number, humidity: number) {
  this.temperature = temperature;
  this.wind = wind;
  this.humidity = humidity;
}

class WeatherService {
  [x: string]: any;
  baseURL: string;
  apiKey: string;
  cityName: string;

constructor() {
    this.baseURL = "https://api.openweathermap.org";
    this.apiKey = "b7b663fa7db9892cae88ee4a2872c96b";
    this.cityName = "";
  }

private async fetchLocationData(query: string): Promise<any> {
    try {
      const response = await fetch (`${this.baseURL}/data/2.5/weather?q=${query}&appid=${this.apiKey}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in fetchLocationData");
      throw error;
    }
  };

private async destructureLocationData(locationData: Coordinates): Promise<Coordinates> {
  try {
    const response = await fetch (`${this.baseURL}/data/2.5/weather?q=${locationData}&appid=${this.apiKey}`);
    const data = await response.json(); 
    const {lat, lon} = data[0];
    return {latitude: lat, longitude: lon};
  } catch (error) {
    console.error("Error in destructureLocationData", error);
    throw error;
  }
    }

 
private async buildGeocodeQuery(locationData: Coordinates): Promise<Coordinates>  {
  try {
    const response = await fetch (`${this.baseURL}/geo/1.0/direct?q=${this.cityname}, ${this.stateCode}, ${this.countryCode}&limit=${this.limit}&appid=${this.apiKey}`);
    const data = await response.json();
    return {latitude: data[0].lat, longitude:data[0].lon};
  } catch (error) {
    console.error("Error in buildGeocodeQuery", error);
    throw error;
  }

}


  private async buildWeatherQuery(coordinates: Coordinates): Promise<string> {
    try {
      const{latitude, longitude} = coordinates;
      const response = await fetch (`${this.baseUrl}/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in buildWeatherQuery", error);
      throw error;
      }
   }
  
  private async fetchAndDestructureLocationData(query: string): Promise<Coordinates> {
    try {
      const response = await fetch (`${this.baseURL}/geo/1.0/direct?q=${this.query}&limit=1&appid=${this.apiKey}`);
      const data = await response.json();
      const {lat, lon} = data[0];
      return { latitude: lat, longitude: lon};
    } catch (error) {
      console.error("Error in fetchandDestructureLocationData", error);
      throw error
    };
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    try {
      const {latitude, longitude} = coordinates;
      const response = await fetch (`${this.baseURL}/data/2.5/weather?lat=${this.latitude}&lon${this.longitude}&appid=${this.apiKey}`);
      const data =  await response.json();
      return data;
    } catch (error) {
      console.error("Error in fetchWeatherData", error);
      throw error;
    }
  }

  // TODO: Build parseCurrentWeather method
  private async parseCurrentWeather(response: any): Promise<any>{
    try {
      const {latitude, longitude} = coordinates;
      const response = await fetch (`${this.baseURL}/data/3.0/onecall/timemachine?lat=${this.latitude}&lon=${this.longitude}&dt=${this.time}&appid=${this.apiKey}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in parseCurrentWeather");
      throw error;
    }
// read city name
// fetch weather data from day of
// return weather data for day of on the left side next to week forecast
  }

  // TODO: Complete buildForecastArray method
  private async buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    try {
      const
    }
    // read city name
    // fetch data from weather data 
    // return weather forecast for one week of the city

  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
// read city name
// return day of forecast 
// return week forecast 

  }
}
}

export default new WeatherService();



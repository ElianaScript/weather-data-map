import dotenv from 'dotenv';
import { query } from 'express';
dotenv.config();

interface Coordinates {
  latitude: number;
  longitude: number;
};

class Weather {
  temperature!: number;
  wind!: number;
  humidity!: number;
};

class WeatherService {
  [x: string]: any;
  baseURL: string;
  apiKey: string;
  cityName: string;

constructor() {
    this.baseURL = "https://api.openweathermap.org";
    this.apiKey = "b7b663fa7db9892cae88ee4a2872c96b";
    this.cityName = "";
  };

private async fetchLocationData(query: string): Promise<any> {
    try {
      const response = await fetch (`${this.baseURL}/data/2.5/weather?q=${query}&appid=${this.apiKey}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in fetchLocationData", error);
      throw error;
    }
  }

  public async getLocationData() {

    const url =`${this.baseURL}/data/2.5/weather?q=${query}&appid=${this.apiKey}`;
    try {
      const data = await this.fetchLocationData(url);
      console.log('Data recieved ', data)
    } catch (error) {
      console.error('Error in getData:', error );
    }
  }


private async destructureLocationData(locationData: Coordinates): Promise<Coordinates> {
  try {
    const response = await fetch (`${this.baseURL}/data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&appid=${this.apiKey}`);
    const data = await response.json(); 
    const {lat, lon} = data.coord
    return {latitude: lat, longitude: lon};
  } catch (error) {
    console.error("Error in destructureLocationData", error);
    throw error;
  }
    }

    public async getDestructuredLocation (locationData: Coordinates): Promise<Coordinates> {
      return await this.destructureLocationData(locationData);
    }
 
private async buildGeocodeQuery(_locationData: Coordinates): Promise<Coordinates>  {
  try {
    const response = await fetch (`${this.baseURL}/geo/1.0/direct?q=${this.cityName}, ${this.stateCode}, ${this.countryCode}&limit=${this.imit}&appid=${this.apiKey}`);
    const data = await response.json();
    return {latitude: data[0].lat, longitude:data[0].lon};
  } catch (error) {
    console.error("Error in buildGeocodeQuery", error);
    throw error;
  }

}

public async getGeocodeQuery(locationData: Coordinates): Promise<Coordinates> {
  return await this.buildGeocodeQuery(locationData)
}


  private async buildWeatherQuery(coordinates: Coordinates): Promise<string> {
    try {
      const{latitude, longitude} = coordinates;
      const response = await fetch (`${this.baseUrl}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in buildWeatherQuery", error);
      throw error;
      }
   }
  
   public async getWeatherQuery(coordinates: Coordinates): Promise<string> {
    return await this.buildWeatherQuery(coordinates);
   }


  private async fetchAndDestructureLocationData(query: string): Promise<Coordinates> {
    try {
      const response = await fetch (`${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`);
      const data = await response.json();
      const {lat, lon} = data[0];
      return { latitude: lat, longitude: lon};
    } catch (error) {
      console.error("Error in fetchandDestructureLocationData", error);
      throw error
    }
  }

  public async getfdLocationData(query:string): Promise<Coordinates> {
    return await this.fetchAndDestructureLocationData(query);
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    try {
      const response = await fetch (`${this.baseURL}/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`);
      const data =  await response.json();
      return data;
    } catch (error) {
      console.error("Error in fetchWeatherData", error);
      throw error;
    }
  }

  public async getWeatherData(coordinates: Coordinates):Promise<any> {
    return await this.fetchWeatherData(coordinates);
  }
 
  private async parseCurrentWeather(response: any): Promise<any>{
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in parseCurrentWeather");
      throw error;
    }
    
  }

  public async getpCurrentWeather(response: any): Promise<any> {
    return await this.parseCurrentWeather(response);
  }
  
  private async buildForecastArray(currentWeather: Weather, weatherData: any[]): Promise<Weather[]>{ 
    const forecastArray: Weather[] =[];
    forecastArray.push(currentWeather);

    for(const data of weatherData) {
      const forecast: Weather = {
      temperature: data.temperature,
      wind: data.wind,
      humidity: data.humidity,
    };
  forecastArray.push(forecast);
}
  return forecastArray;
}

public async getForecastArray(currentWeather: Weather, weatherData: any[]): Promise<Weather[]> {
  return await this.buildForecastArray(currentWeather, weatherData);
}

  async getWeatherForCity(city: string): Promise<Weather[]> {
    try {
      const response = await fetch (`${this.baseURL}/data/2.5/forecast?q=${city}&unit=metric&appid=${this.apiKey}`);
      const data = await response.json();

      const forecastArray: Weather[] = data.list.map((forecast: any) => ({
        temperature: forecast.main.temp,
        wind: forecast.main.wind,
        humidity: forecast.main.humidity,
      }));

      return forecastArray;
    } catch (error) {
      console.error('Error');
      throw error;
    }

  }
}


export default new WeatherService();
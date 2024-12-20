import dotenv from 'dotenv';
dotenv.config();

interface Coordinates {
  latitude: number;
  longitude: number;
};

class Weather {
city: string | undefined;
date: number | undefined;
icon: string | undefined;
iconDescription: string | undefined;
tempf: number | undefined;
windSpeed: number | undefined;
humidity: number | undefined;
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

  public async getLocationData(query: string) {
    try {
      const data = await this.fetchLocationData(`${this.baseURL}/data/2.5/weather?q=${query}&appid=${this.apiKey}`);
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
      return this.destructureLocationData(locationData);
    }
 
private async buildGeocodeQuery(cityName: string, stateCode?: string, countryCode?: string, limit: number=1 ): Promise<Coordinates>  {
  try {
    const response = await fetch (`${this.baseURL}/geo/1.0/direct?q=${cityName}, ${stateCode}, ${countryCode}&limit=${limit}&appid=${this.apiKey}`);
    const data = await response.json();
    return {latitude: data[0].lat, longitude:data[0].lon};
  } catch (error) {
    console.error("Error in buildGeocodeQuery", error);
    throw error;
  }

}

public async getGeocodeQuery(cityName: string, stateCode?: string, countryCode?: string, limit: number=1): Promise<Coordinates> {
  return this.buildGeocodeQuery(cityName, stateCode, countryCode, limit)
}


private async buildWeatherQuery(coordinates: Coordinates): Promise<string> {
    try {
      const{latitude, longitude} = coordinates;
      const response = await fetch (`${this.baseURL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in buildWeatherQuery", error);
      throw error;
      }
   }
  
   public async getWeatherQuery(coordinates: Coordinates): Promise<string> {
    return this.buildWeatherQuery(coordinates);
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
    return this.fetchAndDestructureLocationData(query);
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
    return this.fetchWeatherData(coordinates);
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
    return this.parseCurrentWeather(response);
  }
  
  private async buildForecastArray(currentWeather: Weather, weatherData: any[]): Promise<Weather[]>{ 
    const forecastArray: Weather[] =[];
    forecastArray.push(currentWeather);

    for(const data of weatherData) {
      const forecast: Weather = {
      city: data.city,
      date: data.date,
      icon: data.icon,
      iconDescription: data.iconDescription,
      tempf: data.tempF,
      windSpeed: data.windSpeed,
      humidity: data.humidity,
    };
  forecastArray.push(forecast);
}
  return forecastArray;
}

public async getForecastArray(currentWeather: Weather, weatherData: any[]): Promise<Weather[]> {
  return this.buildForecastArray(currentWeather, weatherData);
}

  async getWeatherForCity(cityName: string): Promise<Weather[]> {
    try {
      const response = await fetch (`${this.baseURL}/data/2.5/forecast?q=${cityName}&units=metric&appid=${this.apiKey}`);
      const data = await response.json();
      console.log(data.list[0]);

      const forecastArray: Weather[] = data.list.map((forecast: any) => ({
        city: data.city.name,
        date: forecast.dt_txt,
        icon: forecast.weather[0].icon,
        iconDescription: forecast.weather[0].description,
        tempF: forecast.main.temp,
        wind: forecast.wind.speed,
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
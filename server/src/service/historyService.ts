import weatherService from './weatherService';
import * as fs from 'fs/promises';
import * as path from 'path';

class City {
  name: string;
  id: string;  

  constructor (name: string, id: string) {
    this.name = name;
    this.id = id;
  }
};

class HistoryService {
  async getWeatherbyHistory(citySearch: any) {
    try {
      const cities = await this.getCities();
      const city =cities.find((city) => city.name.toLowerCase() === citySearch.toLowerCase());
      if (!city) {
        throw new Error ('City not found in search history');
      }
      const weatherData = await weatherService.getWeatherForCity(city.name);

      return weatherData;
    } catch (error) {
      console.error("Error in getWeatherbyHistory", error);
      throw error;

    }
  }
  
  private async read() {
    try {
      const filePath = path.resolve('searchHistory.json');
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error === "ENOENT") {
      console.error("Error reading searchHistory.json file");
      return [];
    }
    console.error("Error in (read)", error);
    throw error;
  }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    try {
      const filePath = path.resolve('searchHistory.json');
      await fs.writeFile(filePath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing to searchHistory.json file', error);
      throw error;
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    try {
      const citiesArray = await this.read();
      return citiesArray.map(
      (cityData: {name: string; id: string }) => new City(cityData.name, cityData.id)
    );
    } catch (error) {
      console.error('Error getting cities from searchHistory.json', error);
    throw error;
    }
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: City) {
    try {
      const cities = await this.getCities();
      cities.push(city);
      await this.write(cities);
      console.log(`${city.name} added to search history`);
    } catch (error) {
      console.error("Error in (add city)", error);
      throw error;
    }
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();

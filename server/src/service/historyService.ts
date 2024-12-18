// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;  

  constructor (name: string, id: string) {
    this.name = name;
    this.id = id;
  }
};

// TODO: Complete the HistoryService class
class HistoryService {
  getWeatherbyHistory(citySearch: any) {
    throw new Error('Method not implemented.');
  }
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    // check searchHistory.json file
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {}
  // cache a city in local storage when updated
  // i think writeFile is wrong here but there it is anyways
  
  // keep city
  // write to array in searchHistory.json

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {}
  // read cities from searchHistory.json 
  // return as an array of City objects

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {}
  // add city to searchHistory.json file

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();

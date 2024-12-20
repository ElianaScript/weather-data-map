import dotenv from 'dotenv';
dotenv.config();
{
    this.longitude;
    number;
    this.latitude;
    number;
}
;
// TODO: Define a class for the Weather object
class Weather {
}
;
// TODO: Complete the WeatherService class
class WeatherService {
    constructor(cityName) {
        // TODO: Create fetchLocationData method
        this.fetchDataLocation = {
        //private async fetchLocationData(query: string) {}
        };
        this.baseURL = "https://api.openweathermap.org";
        this.apiKey = "b7b663fa7db9892cae88ee4a2872c96b";
        this.cityName = cityName;
    }
}
;
// TODO: Create destructureLocationData method
const destructureLocationData = {
//private destructureLocationData(locationData: Coordinates): Coordinates {}
};
// TODO: Create buildGeocodeQuery method
const buildGeocodeQuery = {
//private  buildGeocodeQuery(): Promise<string> {}
};
export default new WeatherService();

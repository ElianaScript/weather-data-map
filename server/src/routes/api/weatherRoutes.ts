import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';


router.post('/', async (req, res) => {
  const {cityName} =req.body;

  try {
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

/*router.post('/city', async (req, res) => {
  const {citySearch} = req.body;

  try {
    const saveCity = await HistoryService.getWeatherbyHistory(citySearch);
    res.json(saveCity);
  } catch (error) {
    console.log('Error');
  }
});*/

router.get('history', async (req, res) => {
  const history = req.body;

  try {
    const searchHistory = await HistoryService.getWeatherbyHistory(history);
    res.json(searchHistory);
  } catch (error) {
    console.log('Error');
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, _res) => {});

export default router;

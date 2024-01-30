const express = require('express');
const path = require('path');
const axios = require('axios');
const moment = require('moment');
const app = express();
const port = 3000;


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const tourHistory = [];


const getTourHistory = () => {
  return tourHistory;
};


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.route('/travelagency')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'travelagency.html'));
  })
  .post(async (req, res) => {
    const result = await calculateTour(req.body);
    tourHistory.push({
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      tourResult: result,
    });
    res.send(result);
  });

async function calculateTour(data) {
  try {
    const weatherResponse = await axios.get('https://api.openweathermap.org/data/3.5/weather', {
      params: {
        q: `${data.city},${data.country}`,
        appid: process.env.OPENWEATHER_API_KEY,
      },
    });

    const additionalInfo = await fetchRandomInfo(data.city);
    const cost = 500;

    const tourResult = {
      cost: cost,
      weather: weatherResponse.data.weather ? weatherResponse.data.weather[0].description : 'Not available',
      additionalInfo: additionalInfo,
      message: 'Enjoy your tour to a beautiful destination!',
    };

    return tourResult;
  } catch (error) {
    console.error('Error in calculateTour:', error);
    return { error: 'An error occurred during tour calculation.' };
  }
}

async function fetchRandomInfo(city) {
  const infoSources = [
    'https://api.example1.com/info',
    'https://api.example2.com/info',
    
  ];

  const randomSource = infoSources[Math.floor(Math.random() * infoSources.length)];

  try {
    const response = await axios.get(randomSource, {
      params: {
        city: city,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching random information:', error);
    return null;
  }
}


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

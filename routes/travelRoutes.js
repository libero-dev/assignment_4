const express = require('express');
const router = express.Router();

// Travel Agency Logic
router.route('/')
  .get((req, res) => {
    res.sendFile(__dirname + '/../views/travelagency.html');
  })
  .post((req, res) => {
    const result = calculateTour(req.body);
    res.send(result);
  });

// Sample function for tour calculation
function calculateTour(data) {
  // Implement your logic here
  // Example: Calculate cost, fetch weather, store history, etc.
  // Return the result as an object
  const tourResult = {
    cost: 500,
    weather: 'Sunny',
    message: 'Enjoy your tour to a beautiful destination!',
  };
  return tourResult;
}

module.exports = router;
module.exports = { calculateTour };


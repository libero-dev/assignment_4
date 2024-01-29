const express = require('express');
const router = express.Router();

module.exports = function (getTourHistory) {
  router.get('/', (req, res) => {
    console.log('Calling getTourHistory function');
    const history = getTourHistory();
    console.log('History:', history);
    res.json(history);
  });

  return router;
};

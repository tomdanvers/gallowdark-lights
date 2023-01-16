var express = require('express');
var router = express.Router();

var PiglowController = require('../src/js/PiglowController');

/* POST light data. */
router.post('/', function(req, res) {
  const data = req.body;
  PiglowController.updateGlobalMax(data.globalMax);
  PiglowController.updatePins(data.pins);
  res.send(PiglowController.pinsToJSON());
});

module.exports = router;

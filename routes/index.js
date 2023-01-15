var express = require('express');
const LightTypes = require('../src/js/LightTypes');
const LightTypesList = [];
for (var key in LightTypes) {
  LightTypesList.push({
    label: LightTypes[key]
  });
}

var router = express.Router();
var PiglowController = require('../src/js/PiglowController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Light the Gallowdark',
    pins: PiglowController.pins,
    lights: LightTypesList
   });
});

module.exports = router;

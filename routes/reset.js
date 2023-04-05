var express = require('express');
var router = express.Router();
var PiglowController = require('../src/js/PiglowController');

router.post('/', function(req, res) {
    PiglowController.resetAndSave();
    res.send(PiglowController.pinsToJSON());
});

module.exports = router;

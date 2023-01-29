var shell = require('shelljs');
var isPi = require('detect-rpi');
var express = require('express');
var router = express.Router();
var PiglowController = require('../src/js/PiglowController');

router.post('/', function(req, res) {
    if (isPi()) {
      PiglowController.fadeOut(() => {
        console.log('Running on PI so shutting down...');
        shell.exec('sudo shutdown -h now');
      });
    } else {
      PiglowController.fadeOut(() => {
        console.log('Not running on PI so just ending process...');
        process.exit();
      });
    }
    res.send('');
});

module.exports = router;

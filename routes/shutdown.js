var shell = require('shelljs');
var isPi = require('detect-rpi');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    if (isPi()) {
      console.log('Running on PI so shutting down...');
      shell.exec('sudo shutdown -h now');
    } else {
      console.log('Not running on PI so just ending process...');
      process.exit();
    }
    res.send('');
});

module.exports = router;

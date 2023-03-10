'use strict';

const PiglowController = require('../PiglowController.js');
const LightTypes = require('../LightTypes');
const Light = require('./Light');

class LightBright extends Light {
    constructor(pi, pin, globalMax) {
        super(pi, pin, globalMax)

        this.type = LightTypes.BRIGHT;
        
        this.setValue(240);
    }
}

module.exports = LightBright;
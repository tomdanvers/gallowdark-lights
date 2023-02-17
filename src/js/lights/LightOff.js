'use strict';

const LightTypes = require('../LightTypes');
const Light = require('./Light');

class LightOff extends Light {
    constructor(pi, pin, globalMax) {
        super(pi, pin, globalMax)

        this.type = LightTypes.OFF;
        
        this.setValue(0);
    }
}

module.exports = LightOff;
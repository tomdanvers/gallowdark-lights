'use strict';

const PiglowController = require('../PiglowController.js');
const LightTypes = require('../LightTypes');

class Light {
    constructor(pi, pin, globalMax) {

        this.type = LightTypes.STANDARD;
        
        this.pi = pi;
        this.pin = pin;
        this.globalMax = globalMax;
        this.value = 0;
        this.setValue(100);
    }

    setGlobalMax(value) {
        this.globalMax = value;
        this.updateVal();
    }
    
    setValue(value) {
        this.value = Math.max(0, Math.min(255, value));
        this.updateVal();
    }
    
    updateVal() {
        this.pi[this.pin.pinId] = Math.min(this.pin.max * 255, Math.floor(this.value * this.globalMax));
    }
    
    random() {
        this.setValue(Math.random() * 255);
    }

    destroy() {
        this.setValue(0);
        this.pin = null;
    }
}

module.exports = Light;
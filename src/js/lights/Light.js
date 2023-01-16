'use strict';

const PiglowController = require('../PiglowController.js');
const LightTypes = require('../LightTypes');

class Light {
    constructor(pi, pinId) {

        this.type = LightTypes.STANDARD;
        
        this.pi = pi;
        this.pinId = pinId;
        this.value = 0;
        this.globalMax = 1;
        this.setValue(50);
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
        this.pi[this.pinId] = Math.floor(this.value * this.globalMax);
    }
    
    random() {
        this.setValue(Math.random() * 255);
    }

    destroy() {
        this.setValue(0);
    }
}

module.exports = Light;
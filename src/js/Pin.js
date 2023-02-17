'use strict';

const LightTypes = require('./LightTypes');

const LIGHT_CLASSES = {};
LIGHT_CLASSES[LightTypes.STANDARD] = require('./lights/Light');
LIGHT_CLASSES[LightTypes.BRIGHT] = require('./lights/LightBright');
LIGHT_CLASSES[LightTypes.MAX] = require('./lights/LightMax');
LIGHT_CLASSES[LightTypes.PLASMA_CORE] = require('./lights/PlasmaCore');
LIGHT_CLASSES[LightTypes.FAULTY_FLOURESCENT] = require('./lights/FaultyFlourescent');
LIGHT_CLASSES[LightTypes.STEADY_BLINK] = require('./lights/SteadyBlink');
LIGHT_CLASSES[LightTypes.FIRE] = require('./lights/Fire');
LIGHT_CLASSES[LightTypes.OFF] = require('./lights/LightOff');

class Pin {
    constructor(index, config, pi) {
        this.index = index;
        this.id = config.id;
        this.pinId = config.pinId;
        this.group = config.group;
        this.number = index + 1;
        this.label = config.label;
        this.max = config.max;
        this.pi = pi;
        
        this.active = true;
        this.light = false;
    }

    setActive(active) {
        this.active = active;
    }

    changeLight(type, globalMax) {
        if (this.light) {
            if (type === this.light.type) {
                return;
            } else {
                this.light.destroy();
            }
        }

        let LightClass = LIGHT_CLASSES[type];
        if (LightClass) {
            this.light = new LightClass(this.pi, this, globalMax);
        }
    }
    
    destroy() {
        if (this.light) {
            this.light.destroy();
        }
    }
}

module.exports = Pin;
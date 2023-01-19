'use strict';

const LightTypes = require('./LightTypes');

const LIGHT_CLASSES = {};
LIGHT_CLASSES[LightTypes.STANDARD] = require('./lights/Light');
LIGHT_CLASSES[LightTypes.BRIGHT] = require('./lights/LightBright');
LIGHT_CLASSES[LightTypes.PLASMA_CORE] = require('./lights/PlasmaCore');
LIGHT_CLASSES[LightTypes.FAULTY_FLOURESCENT] = require('./lights/FaultyFlourescent');
LIGHT_CLASSES[LightTypes.STEADY_BLINK] = require('./lights/SteadyBlink');

class Pin {
    constructor(index, id, pi) {
        this.index = index;
        this.id = id;
        this.number = index + 1;
        this.label = String(this.number);
        this.pi = pi;
        
        this.active = false;
        this.light = false;
    }

    setActive(active) {
        this.active = active;
    }

    changeLight(type) {
        if (this.light) {
            if (type === this.light.type) {
                return;
            } else {
                this.light.destroy();
            }
        }

        let LightClass = LIGHT_CLASSES[type];
        if (LightClass) {
            this.light = new LightClass(this.pi, this.id);
        }
    }
    
    destroy() {
        if (this.light) {
            this.light.destroy();
        }
    }
}

module.exports = Pin;
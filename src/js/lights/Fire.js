'use strict';

const LightTypes = require('../LightTypes');
const Light = require('./Light');

class Fire extends Light {
    constructor(pi, pin, globalMax) {
        super(pi, pin, globalMax);

        this.type = LightTypes.FAULTY_FLOURESCENT

        this.blink = this.blink.bind(this);

        this.timeout;
        this.isOn = false;

        this.start();
    }

    start() {
        this.blink();
    }

    blink() {
        this.setValue(this.isOn ? 100 + Math.random() * 60 : Math.random() * 255 * this.pin.max);
        this.isOn = !this.isOn;
        this.timeout = setTimeout(this.blink, 130 + Math.random() * 100);
    }

    stop() {
        clearTimeout(this.timeout);
    }

    destroy() {
        this.stop();
        super.destroy();
    }
}

module.exports = Fire;
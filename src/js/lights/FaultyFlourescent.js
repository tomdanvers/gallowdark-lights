'use strict';

const LightTypes = require('../LightTypes');
const Light = require('./Light');

class FaultyFlourescent extends Light {
    constructor(pi, pinId) {
        super(pi, pinId);

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
        this.setValue(this.isOn ? 0 : Math.random() * 255);
        this.isOn = !this.isOn;
        this.timeout = setTimeout(this.blink, 25 + Math.random() * 800);
    }

    stop() {
        clearTimeout(this.timeout);
    }

    destroy() {
        this.stop();
        super.destroy();
    }
}

module.exports = FaultyFlourescent;
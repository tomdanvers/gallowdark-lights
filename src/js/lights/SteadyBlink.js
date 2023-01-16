'use strict';

const LightTypes = require('../LightTypes');
const Light = require('./Light');

class SteadyBlink extends Light {
    constructor(pi, pinId) {
        super(pi, pinId);

        this.type = LightTypes.STEADY_BLINK;

        this.update = this.update.bind(this);

        this.interval;
        this.isOn = false;
        this.maxValue = 200;

        this.start();
    }

    start() {
        this.interval = setInterval(this.update, 1000);
    }

    update() {
        this.isOn = !this.isOn;
        console.log(this.isOn)
        this.setValue(this.isOn ? this.maxValue : 0);
    }

    stop() {
        clearInterval(this.interval);
    }

    destroy() {
        this.stop();
        super.destroy();
    }
}

module.exports = SteadyBlink;
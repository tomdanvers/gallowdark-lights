'use strict';

const LightTypes = require('../LightTypes');
const Light = require('./Light');

class PlasmaCore extends Light {
    constructor(pi, pinId) {
        super(pi, pinId);

        this.type = LightTypes.PLASMA_CORE;

        this.update = this.update.bind(this);

        this.interval;
        this.tick = 0;
        this.framesPerSecond = 50;
        this.minValue = 50;
        this.maxValue = 200;

        this.start();
    }

    start() {
        this.interval = setInterval(this.update, 1000 / this.framesPerSecond);
    }

    update() {
        this.tick ++;

        let sec = this.tick / this.framesPerSecond;
        let sinVal = (Math.sin(sec) + 1) * .5;
        let val = this.minValue + (this.maxValue - this.minValue) * sinVal;
        this.setValue(val);
    }

    stop() {
        clearInterval(this.interval);
    }

    destroy() {
        this.stop();
        super.destroy();
    }
}

module.exports = PlasmaCore;
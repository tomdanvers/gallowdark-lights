'use strict';

var glow = require('piglow');

var lookupTable = {
    l_0_0: 0, l_0_1: 1, l_0_2: 2, l_0_3: 3, l_0_4: 14, l_0_5: 12,
    l_1_0: 6, l_1_1: 7, l_1_2: 8, l_1_3: 5, l_1_4: 4, l_1_5: 9,
    l_2_0: 17, l_2_1: 16, l_2_2: 15, l_2_3: 13, l_2_4: 11, l_2_5: 10
};

var PINS = [];
var PIN_MAP = {};

for (var key in  lookupTable) {
    PINS[lookupTable[key]] = key;
    PIN_MAP[lookupTable[key] + 1] = key;
}
 
glow((error, pi) => {
    if (error) {
        console.log(error);
    } else {
        let LIGHTS = [
            new Light(pi, PIN_MAP[2]),
            new Light(pi, PIN_MAP[5]),
            new Light(pi, PIN_MAP[6]),
            new PlasmaCore(pi, PIN_MAP[10]),
            new FaultyFluorescent(pi, PIN_MAP[15])
        ];
        
        process.on('SIGINT', function() {
            console.log('Caught interrupt signal');
            
            LIGHTS.forEach((light) => {
                light.destroy();
            });
            
            pi.all = 0;
        
            setTimeout(function() {
                process.exit();
            }, 250);
        });
    }
});


class Light {
    constructor(pi, pinId) {

        this.pi = pi;
        this.pinId = pinId;
        this.value;
        this.setValue(50);
    }
    
    setValue(value) {
        this.value = Math.max(0, Math.min(255, value));
        this.pi[this.pinId] = this.value;
    }
    
    random() {
        this.setValue(Math.random() * 255);
    }

    destroy() {
        this.setValue(0);
    }
}

class FaultyFluorescent extends Light {
    constructor(pi, pinId) {
        super(pi, pinId);

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

class PlasmaCore extends Light {
    constructor(pi, pinId) {
        super(pi, pinId);

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
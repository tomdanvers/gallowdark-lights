'use strict';

try{
    var glow = require('piglow');
} catch(e) {
    var glow = require('./piglow-mock');
}

const LightTypes = require('./LightTypes');
const Pin = require('./Pin');

class PiglowController {
    constructor() {
        
        var lookupTable = {
            l_0_0: 0, l_0_1: 1, l_0_2: 2, l_0_3: 3, l_0_4: 14, l_0_5: 12,
            l_1_0: 6, l_1_1: 7, l_1_2: 8, l_1_3: 5, l_1_4: 4, l_1_5: 9,
            l_2_0: 17, l_2_1: 16, l_2_2: 15, l_2_3: 13, l_2_4: 11, l_2_5: 10
        };

        var pinLabels = {
            2: 'Lorem',
            5: 'Ipsum',
            6: 'Dolor',
            10: 'Sit'
        };
        
        var PINS = [];
        this.pins = [];

        var PIN_MAP = {};
        this.pinMap = {};
        
        for (var key in  lookupTable) {
            PINS[lookupTable[key]] = key;
            PIN_MAP[lookupTable[key] + 1] = key;
        }

        this.globalMax = 1;
         
        glow((error, pi) => {
            if (error) {
                console.log(error);
            } else {
                // Init pins
                let pin;
                PINS.forEach((pinId, index) => {
                    pin = new Pin(index, pinId, pi);
                    if (pinLabels[index + 1]) {
                        pin.label = pinLabels[index + 1];
                    }
                    this.pins.push(pin);
                    this.pinMap[String(index + 1)] = pin;
                });

                this.pinMap['2'].setActive(true);
                this.pinMap['5'].setActive(true);
                this.pinMap['6'].setActive(true);
                this.pinMap['10'].setActive(true);
                // this.pinMap['15'].setActive(true);
        
                this.pinMap['2'].changeLight(LightTypes.STEADY_BLINK);
                this.pinMap['5'].changeLight(LightTypes.STANDARD);
                this.pinMap['6'].changeLight(LightTypes.FAULTY_FLOURESCENT);
                this.pinMap['10'].changeLight(LightTypes.PLASMA_CORE);
                // this.pinMap['15'].changeLight(LightTypes.STANDARD);
                
                process.on('SIGINT', () => {
                    pi.all = 0;
                    if (typeof(pi.destroy) === 'function') {
                        pi.destroy();
                    }
                    
                    console.log('Turning off the lights...');
                    
                    this.pins.forEach((pin) => {
                        pin.destroy();
                    });
                
                    setTimeout(function() {
                        process.exit();
                    }, 250);
                });
            }
        });
    }

    updateGlobalMax(value) {
        if (this.globalMax !== value) {
            this.globalMax = value;
            this.pins.forEach((pin) => {
                if (pin.active) {
                    pin.light.setGlobalMax(this.globalMax > .1 ? this.globalMax : 0);
                }
            });
        }
    }

    updatePins(pins) {
        pins.forEach((pin) => {
            if (this.pins[pin.index]) {
                this.pins[pin.index].changeLight(pin.type);
            }
        });
    }

    pinsToJSON() {
        let pins = [];
        this.pins.forEach((pin) => {
            if (pin.active) {
                pins.push({
                    index: pin.index,
                    type: pin.light ? pin.light.type : false
                });
            }
        });
        return JSON.stringify(pins);
    }
}


module.exports = new PiglowController();
'use strict';

try{
    var glow = require('piglow');
} catch(e) {
    var glow = require('./piglow-mock');
}

const LightTypes = require('./LightTypes');
const Pin = require('./Pin');
const DEFAULT_BRIGHTNESS = 150;

class PiglowController {
    constructor() {
        
        // var lookupTable = {
        //     l_0_0: 0, l_0_1: 1, l_0_2: 2, l_0_3: 3, l_0_4: 14, l_0_5: 12,
        //     l_1_0: 6, l_1_1: 7, l_1_2: 8, l_1_3: 5, l_1_4: 4, l_1_5: 9,
        //     l_2_0: 17, l_2_1: 16, l_2_2: 15, l_2_3: 13, l_2_4: 11, l_2_5: 10
        // };

        const pinConfig = [
            {
                id: 1,
                pinId: 'l_0_0',
                label: 'Lorem ipsum 1',
                max: 1
            },
            {
                id: 2,
                pinId: 'l_0_1',
                label: 'Lorem ipsum 2',
                max: .8
            },
            {
                id: 3,
                pinId: 'l_0_2',
                label: 'Lorem ipsum 3',
                max: 1
            },
            {
                id: 4,
                pinId: 'l_0_3',
                label: 'Lorem ipsum 4',
                max: 1
            },
            {
                id: 5,
                pinId: 'l_1_4',
                label: 'Lorem ipsum 5',
                max: 1
            },
            {
                id: 6,
                pinId: 'l_1_3',
                label: 'Lorem ipsum 6',
                max: 1
            },
            {
                id: 7,
                pinId: 'l_1_0',
                label: 'Lorem ipsum 7',
                max: 1
            },
            {
                id: 8,
                pinId: 'l_1_1',
                label: 'Lorem ipsum 8',
                max: 1
            },
            {
                id: 9,
                pinId: 'l_1_2',
                label: 'Lorem ipsum 9',
                max: 1
            },
            {
                id: 10,
                pinId: 'l_1_5',
                label: 'Lorem ipsum 10',
                max: 1
            },
            {
                id: 11,
                pinId: 'l_2_5',
                label: 'Lorem ipsum 11',
                max: 1
            },
            {
                id: 12,
                pinId: 'l_2_4',
                label: 'Lorem ipsum 12',
                max: 1
            },
            {
                id: 13,
                pinId: 'l_0_5',
                label: 'Lorem ipsum 13',
                max: 1
            },
            {
                id: 14,
                pinId: 'l_2_3',
                label: 'Lorem ipsum 14',
                max: 1
            },
            {
                id: 15,
                pinId: 'l_0_4',
                label: 'Lorem ipsum 15',
                max: 1
            },
            {
                id: 16,
                pinId: 'l_2_2',
                label: 'Lorem ipsum 16',
                max: 1
            },
            {
                id: 17,
                pinId: 'l_2_1',
                label: 'Lorem ipsum 17',
                max: 1
            },
            {
                id: 18,
                pinId: 'l_2_0',
                label: 'Lorem ipsum 18',
                max: 1
            }
        ];

        this.pins = [];
        this.pinMap = {};

        this.globalMax = 1;
         
        glow((error, pi) => {
            if (error) {
                console.log(error);
            } else {
                // Init pins
                let pin;
                pinConfig.forEach((config, index) => {
                    pin = new Pin(index, config, pi);
                    this.pins.push(pin);
                    this.pinMap[String(pin.number)] = pin;
                });

                this.pinMap['1'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['2'].changeLight(LightTypes.BRIGHT, this.globalMax);
                this.pinMap['3'].changeLight(LightTypes.PLASMA_CORE, this.globalMax);
                this.pinMap['4'].changeLight(LightTypes.FAULTY_FLOURESCENT, this.globalMax);
                this.pinMap['5'].changeLight(LightTypes.STEADY_BLINK, this.globalMax);
                this.pinMap['6'].changeLight(LightTypes.FIRE, this.globalMax);
                this.pinMap['7'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['8'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['9'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['10'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['11'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['12'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['13'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['14'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['15'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['16'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['17'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['18'].changeLight(LightTypes.STANDARD, this.globalMax);
                
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
                this.pins[pin.index].changeLight(pin.type, this.globalMax);
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
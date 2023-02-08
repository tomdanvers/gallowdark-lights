'use strict';

try{
    var glow = require('piglow');
} catch(e) {
    var glow = require('./piglow-mock');
}

const LightTypes = require('./LightTypes');
const Pin = require('./Pin');
const DEFAULT_BRIGHTNESS = 150;

const GROUPS = {
    FEATURE: 'group-feature',
    UPLIGHT: 'group-uplight',
    FLEXIBLE: 'group-flexible'
};

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
                label: 'Fan Shaft',
                max: 1,
                group: GROUPS.FEATURE
            },
            {
                id: 2,
                pinId: 'l_0_1',
                label: 'E4 - Top Left',
                max: 1,
                group: GROUPS.FLEXIBLE
            },
            {
                id: 3,
                pinId: 'l_0_2',
                label: 'C2',
                max: 1,
                group: GROUPS.UPLIGHT
            },
            {
                id: 4,
                pinId: 'l_0_3',
                label: 'The Lurker Between Decks',
                max: 1,
                group: GROUPS.FEATURE
            },
            {
                id: 5,
                pinId: 'l_1_4',
                label: 'Access Hatch',
                max: 1,
                group: GROUPS.FEATURE
            },
            {
                id: 6,
                pinId: 'l_1_3',
                label: 'C1',
                max: 1,
                group: GROUPS.FLEXIBLE
            },
            {
                id: 7,
                pinId: 'l_1_0',
                label: 'E7',
                max: 1,
                group: GROUPS.UPLIGHT
            },
            {
                id: 8,
                pinId: 'l_1_1',
                label: 'Power Conduits',
                max: 1,
                group: GROUPS.FEATURE
            },
            {
                id: 9,
                pinId: 'l_1_2',
                label: 'B6 - Circle Pit',
                max: 1,
                group: GROUPS.FLEXIBLE
            },
            {
                id: 10,
                pinId: 'l_1_5',
                label: 'B3',
                max: 1,
                group: GROUPS.UPLIGHT
            },
            {
                id: 11,
                pinId: 'l_2_5',
                label: 'C4',
                max: 1,
                group: GROUPS.UPLIGHT
            },
            {
                id: 12,
                pinId: 'l_2_4',
                label: 'D5',
                max: 1,
                group: GROUPS.UPLIGHT
            },
            {
                id: 13,
                pinId: 'l_0_5',
                label: 'Cargo Lift - Open',
                max: 1,
                group: GROUPS.FEATURE
            },
            {
                id: 14,
                pinId: 'l_2_3',
                label: 'Inactive',
                max: 1
            },
            {
                id: 15,
                pinId: 'l_0_4',
                label: 'E4 - Bottom Right',
                max: 1,
                group: GROUPS.FLEXIBLE
            },
            {
                id: 16,
                pinId: 'l_2_2',
                label: 'The Sump',
                max: .75,
                group: GROUPS.FEATURE
            },
            {
                id: 17,
                pinId: 'l_2_1',
                label: 'E5',
                max: 1,
                group: GROUPS.FLEXIBLE
            },
            {
                id: 18,
                pinId: 'l_2_0',
                label: 'Cargo Lift - Closed',
                max: 1,
                group: GROUPS.FEATURE
            }
        ];

        this.pins = [];
        this.pinMap = {};

        this.pinGroups = [
            {
                id: GROUPS.FLEXIBLE,
                label: 'Flexible',
                pins: []
            },
            {
                id: GROUPS.UPLIGHT,
                label: 'Uplights',
                pins: []
            },
            {
                id: GROUPS.FEATURE,
                label: 'Features',
                pins: []
            }
        ];
        this.pinGroupsMap = {};

        this.globalMax = 0;
         
        glow((error, pi) => {
            if (error) {
                console.log(error);
            } else {
                // Init groups
                this.pinGroups.forEach((pinGroup) => {
                    this.pinGroupsMap[pinGroup.id] = pinGroup;
                });

                // Init pins
                let pin;
                pinConfig.forEach((config, index) => {
                    pin = new Pin(index, config, pi);
                    this.pins.push(pin);
                    this.pinMap[String(pin.number)] = pin;

                    if (this.pinGroupsMap[pin.group]) {
                        this.pinGroupsMap[pin.group].pins.push(pin);
                    }
                });

                this.pinMap['1'].changeLight(LightTypes.MAX, this.globalMax);
                this.pinMap['2'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['3'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['4'].changeLight(LightTypes.FAULTY_FLOURESCENT, this.globalMax);
                this.pinMap['5'].changeLight(LightTypes.FAULTY_FLOURESCENT, this.globalMax);
                this.pinMap['6'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['7'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['8'].changeLight(LightTypes.PLASMA_CORE, this.globalMax);
                this.pinMap['9'].changeLight(LightTypes.BRIGHT, this.globalMax);
                this.pinMap['10'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['11'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['12'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['13'].changeLight(LightTypes.STEADY_BLINK, this.globalMax);
                this.pinMap['14'].setActive(false);
                this.pinMap['15'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['16'].changeLight(LightTypes.FAULTY_FLOURESCENT, this.globalMax);
                this.pinMap['17'].changeLight(LightTypes.STANDARD, this.globalMax);
                this.pinMap['18'].changeLight(LightTypes.BRIGHT, this.globalMax);

                this.fadeIn();
                
                process.on('SIGINT', () => {
                    this.fadeOut(() => {
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
                });
            }
        });
    }

    fadeIn(cb) {
        this.fade(0.0075, cb);
    }

    fadeOut(cb) {
        this.fade(-0.02, cb);
    }

    fade(increment, cb) {
        clearInterval(this.fadeInterval);
        this.fadeInterval = setInterval(() => {
            let newGlobalMax;
            if (increment > 0) {
                newGlobalMax = Math.min(1, this.globalMax + increment);
            } else if (increment < 0) {
                newGlobalMax = Math.max(0, this.globalMax + increment);
            }
            this.updateGlobalMax(newGlobalMax);
            if (increment > 0 && newGlobalMax === 1) {
                clearInterval(this.fadeInterval);
                if (cb) {
                    cb();
                }
            } else if (increment < 0 && newGlobalMax === 0) {
                clearInterval(this.fadeInterval);
                if (cb) {
                    cb();
                }
            }
        }, 1000 / 30);
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
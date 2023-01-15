'use strict';

console.log('========================');
console.log('Light in the Gallowdark.');
console.log('========================');

try{
    var glow = require('piglow');
} catch(e) {
    var glow = require('./src/js/piglow-mock');
}

const LightTypes = require('./src/js/LightTypes');
const Pin = require('./src/js/Pin');

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
        // Init pins
        let pin;
        let pins = [];
        let pinMap = {};
        PINS.forEach((pinId, index) => {
            pin = new Pin(index, pinId, pi);
            pins.push(pin);
            pinMap[String(index + 1)] = pin;
        });

        pinMap['2'].changeLight(LightTypes.STANDARD);
        pinMap['5'].changeLight(LightTypes.STANDARD);
        pinMap['6'].changeLight(LightTypes.FAULTY_FLOURESCENT);
        pinMap['10'].changeLight(LightTypes.PLASMA_CORE);
        
        process.on('SIGINT', function() {
            pi.all = 0;
            if (typeof(pi.destroy) === 'function') {
                pi.destroy();
            }
            
            console.log('Turning off the lights...');
            
            pins.forEach((pin) => {
                pin.destroy();
            });
        
            setTimeout(function() {
                process.exit();
            }, 250);
        });
    }
});
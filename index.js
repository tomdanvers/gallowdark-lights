'use strict';

var glow = require('piglow');

var lookupTable = {
    l_0_0: 0, l_0_1: 1, l_0_2: 2, l_0_3: 3, l_0_4: 14, l_0_5: 12,
    l_1_0: 6, l_1_1: 7, l_1_2: 8, l_1_3: 5, l_1_4: 4, l_1_5: 9,
    l_2_0: 17, l_2_1: 16, l_2_2: 15, l_2_3: 13, l_2_4: 11, l_2_5: 10
};

var PINS = [];
var PIN_MAP = {};
var interval;

for (var key in  lookupTable) {
    PINS[lookupTable[key]] = key;
    PIN_MAP[lookupTable[key] + 1] = key;
}
 
glow((error, pi) => {
    if (error) {
        console.log(error);
    } else {
        let light = new Light(pi, PIN_MAP[1]);
        
        process.on('SIGINT', function() {
            console.log('Caught interrupt signal');
            // Turn off all
        
            clearInterval(interval);
        
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
        console.log(`Light ${this.pinId}`);
        this.value;
        this.setValue(0);
        
        this.int = setInterval(() => {
            this.random();
        }, 250);
    }
    
    setValue(value) {
        this.value = Math.max(0, Math.min(255, value));
        this.pi[this.pinId] = this.value;
        console.log(`Light ${this.pinId}`);
    }
    
    random() {
        this.setValue(Math.random() * 255);
    }
}
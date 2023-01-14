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

console.log(PINS);
console.log(PINS_MAP);

 
glow((error, pi) => {
    if (error) {
        console.log(error);
    } else {
        var index = 0;

        setInterval(function() {
            console.log(index, PINS[index]);

            index ++;

            pi[PINS[index]] = 255;
        
            setTimeout(function() {         
                pi[PINS[index]] = 0;
            }, 500);

            if (index >= PINS.length) {
                index = 0;
            }
        }, 500);
    }
});
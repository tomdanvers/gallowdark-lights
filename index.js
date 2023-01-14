var glow = require('piglow');

var PINS = [
    'l_0_0',
    'l_0_1',
    'l_0_2',
    'l_0_3',
    'l_0_4',
    'l_0_5',
    'l_1_0',
    'l_1_1',
    'l_1_2',
    'l_1_3',
    'l_1_4',
    'l_1_5',
    'l_2_0',
    'l_2_1',
    'l_2_2',
    'l_2_3',
    'l_2_4',
    'l_2_5'
];

var PIN_MAP = {};

for (var i = 0; i < PINS.length; i ++) {
    PIN_MAP[String(i+1)] = PINS[i];
}

// var ENABLED = [1,5,10,15];
 
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
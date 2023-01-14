var glow = require('piglow');

var PIN_MAP = {
    1: 'l_0_0',
    2: 'l_0_1',
    3: 'l_0_2',
    4: 'l_0_3',
    5: 'l_0_4',
    6: 'l_0_5',
    7: 'l_1_0',
    8: 'l_1_1',
    9: 'l_1_2',
    10: 'l_1_3',
    11: 'l_1_4',
    12: 'l_1_5',
    13: 'l_2_0',
    14: 'l_2_1',
    15: 'l_2_2',
    16: 'l_2_3',
    17: 'l_2_4',
    18: 'l_2_5'
};

var ENABLED = [1,5,10,15];
 
glow((error, pi) => {
    if (error) {
        console.log(error);
    } else {
        
        

        var index = 0;

        setInterval(function() {
            console.log(index, pi[PIN_MAP]);

            index ++;

            pi[PIN_MAP] = 255;
        
            setTimeout(function() {         
                pi[PIN_MAP] = 0;
            }, 500);

            if (index >= PIN_MAP.length) {
                index = 0;
            }
        }, 500);
    }
});
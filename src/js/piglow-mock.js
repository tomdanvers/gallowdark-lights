'use strict';

const LOOKUP_TABLE = {
    l_0_0: 0, l_0_1: 1, l_0_2: 2, l_0_3: 3, l_0_4: 14, l_0_5: 12,
    l_1_0: 6, l_1_1: 7, l_1_2: 8, l_1_3: 5, l_1_4: 4, l_1_5: 9,
    l_2_0: 17, l_2_1: 16, l_2_2: 15, l_2_3: 13, l_2_4: 11, l_2_5: 10
};

const LOOKUP_ARR = [];
for (let key in LOOKUP_TABLE) {
    LOOKUP_ARR[LOOKUP_TABLE[key]] = key;
}

class PiglowMock {
    constructor() {
        console.log('PiglowMock - Debug the PiGlow!');
        this.destroyed = false;
        this.all = 0;
        LOOKUP_ARR.forEach((key) => {
            this[key] = 0;
        });
    }

    render() {
        if (!this.destroyed) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            let str = '';
            LOOKUP_ARR.forEach((key, index) => {
                let val = Math.floor(this[key]);
                if (val < 10) {
                    val = '00' + val;
                } else if (val < 100) {
                    val = '0' + val;
                }
                str += `[${index + 1} : \x1b[38;2;${val};${val};${val}m${val}\x1b[39m] `;
            });
            process.stdout.write(str);
        }
    }

    destroy() {
        this.destroyed = true;
        process.stdout.write('\n');
    }
}

module.exports = (callback) => {
    let pi = new PiglowMock();

    let proxy = new Proxy(pi, {
        get(target, name, receiver) {
            if (Reflect.has(target, name)) {
                let rv = Reflect.get(target, name, receiver);
                return rv;
            }
            return `Missing prop ${name}`;
        },
        set(target, name, value, receiver) {
            if (name.indexOf('l') === 0) {
                target[name] = value;
                target.render();
            } else if (name === 'all') {
                for(let key in LOOKUP_TABLE) {
                    target[key] = value;
                }
                target.render();
            }
            return Reflect.set(target, name, value, receiver);
        }
    });

    callback(null, proxy);
};
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

module.exports = Light;
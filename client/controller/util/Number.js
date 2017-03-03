class Number {

    static getRandom(min, max){
        return Math.floor((Math.random() * max) + min);
    };
}

module.exports = Number;
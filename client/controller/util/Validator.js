class Validator {
    static stringHasValue(str){
        return (str != null && str.length > 0);
    };
}

module.exports = Validator;
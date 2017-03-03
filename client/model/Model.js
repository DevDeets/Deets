class Model {
    static get user(){
        return Model._user;
    };

    static set user(val){
        Model._user = val;
    };
}

module.exports = Model;
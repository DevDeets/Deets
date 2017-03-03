const Number = require("util/Number");
const Util = require("util/Util");

class Api {

    static dummyCall(data, cb){
        let $loader = $(".api-loader");
        $loader.css("display","block").addClass("active").removeClass("hidden");
        Util.callLater(function(){
            cb();
            $loader.removeClass("active").addClass("hidden");
        }, Number.getRandom(200, 1000));
    };
}

module.exports = Api;

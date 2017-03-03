const HTML = require("sections/header/HeaderComps.html");

const Util = require("util/Util");
const UIComponent = require("base/UIComponent");

class Header extends UIComponent {
    constructor() {
        super("body .header", HTML);
    };

    onAppReady(){
        Util.callLater(function(){
            let _header = $(".header");
            _header.addClass("ready");
            $(".headerWelcomeTxt", _header).remove();
            $(".loader", _header).remove();
        }, 200);
    }
}

module.exports = Header;

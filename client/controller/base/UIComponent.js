const _Event = require("util/Event");
const _HTML = require("util/Html.js");

class UIComponent {
    constructor(parentSelector, HTML, resource) {
        if(parentSelector){
            const _ID = require("util/Id");
            this.id = _ID.getID();
            if(!resource) {
                resource = {};
            }
            resource._UID_ = this.id;
            this.selector = parentSelector + " #" + this.id;
            this.initialize(parentSelector, HTML, resource);
        }
    };

    initialize(parentSelector, HTML, resource) {
        _HTML.append(parentSelector, HTML, resource);
    };

    disaptchEvent(name, data){
        _Event.dispatchGlobalEvent(name, data);
    };

    addHtml(html, resource, parentSelector, addFirst){
        var selector = this.selector + ((parentSelector) ? " " + parentSelector : "");
        _HTML.append(selector, html, resource, addFirst);
    };

    hide(removeAfter){
        const Util = require("util/Util");
        let $this = $(this.selector);
        $this.removeClass("animated fadeOut fadeIn").addClass("animated fadeOut");
        Util.callLater(function(){
            if(removeAfter){
                $this.remove();
                delete this;
            }
            else{
                $this.addClass("hidden");
            }
        }, 500);
    }

    show(){
        $(this.selector).removeClass("hidden");
        if(this.update)
            this.update();
    }
}

module.exports = UIComponent;

const HTML = require("sections/header/HeaderComps.html");

const Util = require("util/Util");
const UIComponent = require("base/UIComponent");
const Global = require("enum/Global");
const Event = require("util/Event");

class Header extends UIComponent {
    constructor() {
        super("body .header", HTML);
        this.addEventListeners();
    };

    onAppReady(){
        Util.callLater(function(){
            let _header = $(".header");
            _header.addClass("ready");
            $(".headerWelcomeTxt", _header).remove();
            $(".loader", _header).remove();
        }, 200);
    };

    addEventListeners(){
        //Event Listeners:
        Event.addGlobalEventListener(Global.enum.EVENTS.SECTION_ACTION, (e) => this.handleHeaderAction(e));
    };

    handleHeaderAction(event){
        let eventData = event.eventData;
        let action = eventData.action;
        switch(action){
            case Global.enum.ACTIONS.CARD_TAPPED: this.cardTapHandler(true); break;
            case Global.enum.ACTIONS.CARD_DETAIL_BACK: this.cardTapHandler(false); break;
            case Global.enum.ACTIONS.CARD_EDIT: this.cardTapHandler(false); this.cardEditHandler(true); break;
            case Global.enum.ACTIONS.CARD_EDIT_BACK: this.cardTapHandler(true); this.cardEditHandler(false); break;
            case Global.enum.ACTIONS.CARD_ADD: this.cardEditHandler(true); break;
            case Global.enum.ACTIONS.CARD_NEW_BACK: this.cardEditHandler(false); break;
        };
    };

    cardTapHandler(show){
        let $comp = $(".header-comp.header-card-details", "header");
        if(show){
            $comp.removeClass("hidden");
        }
        else{
            $comp.addClass("hidden");
        }
    };
    cardEditHandler(show){
        let $comp = $(".header-comp.header-card-edit", "header");
        if(show){
            $comp.removeClass("hidden");
        }
        else{
            $comp.addClass("hidden");
        }
    }
}

module.exports = Header;

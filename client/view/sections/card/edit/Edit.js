const HTML = require("sections/card/edit/Edit.html");

//Utils
const UIComponent = require("base/UIComponent");
const Util = require("util/Util");
const Event = require("util/Event");

//ENUMS:
const Global = require("enum/Global");

class Edit extends UIComponent{
    constructor(parentSelector) {
        super(parentSelector, HTML);
    };

    addEventListeners(){
        //Event.addGlobalEventListener(Global.enum.EVENTS.SECTION_ACTION, (e) => this.handleSectionAction(e));
    };

    handleSectionAction(e){
        let eventData = event.eventData;
        let action = eventData.action;
        switch(action){
            case Global.enum.ACTIONS.CARD_TAPPED: this.cardTappedHandler(eventData.cardData); break;
        }
    };

    cardTappedHandler(cardObj){
        //create view,
        this.setCardView(cardObj);
        //show view
    };

    setCardView(cardObj){

    }











    onBtnTap(e){
        let $this = $(e.currentTarget);
        let targetId = $this.attr("target");
        $(this.seclector + " .btn-wrapper .btn-link.active").removeClass("active");
        $this.addClass("active");

        $(this.seclector + " .sub-content").addClass("hidden");
        $(this.seclector + " " + targetId).removeClass("hidden");
    };

    onSwitchChange(e){
        let $switch = $(e.currentTarget);
        let checked = $switch.is(':checked');
        let $parent = $switch.parents(".input-field");
        let $input = $("input:not(.switch-chk)", $parent);
        if(!checked)
            $input.attr("disabled", "true");
        else
            $input.removeAttr("disabled");
    }
}

module.exports = Edit;

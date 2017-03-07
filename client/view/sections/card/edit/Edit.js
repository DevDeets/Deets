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
        this.addEventListeners();
    };

    addEventListeners(){
        Event.addTap("header .header-card-edit .one", e => this.onSkip(e));
        Event.addTap("header .header-card-edit .two", e => this.onSave(e));

        Event.addTap(this.selector + " .btn-wrapper .btn-link", e => this.onBtnTap(e));
        Event.addChange(this.selector + " .switch input", e => this.onSwitchChange(e));

        Event.addGlobalEventListener(Global.enum.EVENTS.SECTION_ACTION, (e) => this.handleSectionAction(e));
    };

    handleSectionAction(event){
        let eventData = event.eventData;
        let action = eventData.action;
        switch(action){
            case Global.enum.ACTIONS.CARD_EDIT: this.cardEditHandler(eventData.cardData); break;
            case Global.enum.ACTIONS.CARD_ADD: this.cardEditHandler(eventData.cardData); break;
        }
    };

    onSkip(e){
        let $this = $(this.selector);
        let isEdit = (this.selectedCard && this.selectedCard.card_name);
        let skipEventAction = (isEdit) ? Global.enum.ACTIONS.CARD_EDIT_BACK : Global.enum.ACTIONS.CARD_NEW_BACK;
        $this.removeClass("slideInLeft slideOutLeft").addClass("slideOutLeft");
        Util.callLater(function(){
            $this.removeClass("slideInLeft slideOutLeft").addClass("hidden");
        }, 750);

        this.disaptchEvent(Global.enum.EVENTS.SECTION_ACTION, {"action" : skipEventAction});
    };

    onSave(e){

    };

    cardEditHandler(cardObj){
        this.selectedCard = cardObj;
        this.show("slideInLeft");
    };

    onBtnTap(e){
        let $this = $(e.currentTarget);
        let targetId = $this.attr("target");
        $(this.selector + " .btn-wrapper .btn-link.active").removeClass("active");
        $this.addClass("active");

        $(this.selector + " .sub-content").addClass("hidden");
        $(this.selector + " " + targetId).removeClass("hidden");
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

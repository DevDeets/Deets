const HTML = require("sections/card/detail/Detail.html");
const DetailItemHTML = require("sections/card/detail/DetailItem.html");

//Utils
const UIComponent = require("base/UIComponent");
const Util = require("util/Util");
const Event = require("util/Event");

//ENUMS:
const Global = require("enum/Global");

class Detail extends UIComponent{
    constructor(parentSelector) {
        super(parentSelector, HTML);
        this.addEventListeners();
    };

    addEventListeners(){
        Event.addGlobalEventListener(Global.enum.EVENTS.SECTION_ACTION, (e) => this.handleSectionAction(e));
    };

    handleSectionAction(event){
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
        this.selectedCard = cardObj;
        let $content = $(".content", this.selector).empty();
        this.addHtml(DetailItemHTML, this.selectedCard, ".content");
        this.show();
    };
}

module.exports = Detail;

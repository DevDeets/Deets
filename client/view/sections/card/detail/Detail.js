const HTML = require("sections/card/detail/Detail.html");
const DetailItemHTML = require("sections/card/detail/DetailItem.html");

//Utils
const UIComponent = require("base/UIComponent");
const Util = require("util/Util");
const Event = require("util/Event");
const Validator = require("util/Validator");

//ENUMS:
const Global = require("enum/Global");

class Detail extends UIComponent{
    constructor(parentSelector) {
        super(parentSelector, HTML);
        this.addEventListeners();
    };

    addEventListeners(){
        Event.addTap("header .header-card-details .one", e => this.onSkip(e));
        Event.addTap("header .header-card-details .two", e => this.onEdit(e));
        Event.addTap(this.selector + " .view-control .three" , e => this.onEdit(e));

        Event.addGlobalEventListener(Global.enum.EVENTS.SECTION_ACTION, (e) => this.handleSectionAction(e));
    };

    handleSectionAction(event){
        let eventData = event.eventData;
        let action = eventData.action;
        switch(action){
            case Global.enum.ACTIONS.CARD_TAPPED: this.cardTappedHandler(eventData.cardData); break;
            case Global.enum.ACTIONS.CARD_EDIT_BACK: this.show("fadeIn"); break;
        }
    };

    cardTappedHandler(cardObj){
        //create view,
        this.setCardView(cardObj);
        //show view
    };

    setCardView(cardObj){
        this.selectedCard = cardObj;
        let $collection = $(".collection", this.selector);
        let $imgDiv = $(".card-img-div", this.selector);
        let _resource = Global.cardVO;
        let n = _resource.length;

        $imgDiv.css("background-image", "url('" + cardObj.img_source + "')");
        $imgDiv.css("height", cardObj.card_heigth  + "px");
        $imgDiv.css("max-width", cardObj.card_width + "px");
        $(".collection-item", $collection).remove();

        for(let i = 0; i < n; i++){
            let resObj =  _resource[i];
            let propName = Util.getFirstPropName(resObj);
            let term = resObj[propName];
            let cardValue = cardObj[propName];
            if(Validator.stringHasValue(cardValue)){
                this.addHtml(DetailItemHTML, {term: term, val: cardValue}, ".collection");
            }
        }
        this.show("slideInLeft");
    };

    onSkip(e){
        let $this = $(this.selector);
        $this.removeClass("slideInLeft slideOutLeft fadeOut fadeIn").addClass("slideOutLeft");
        Util.callLater(function(){
            $this.removeClass("slideInLeft slideOutLeft fadeOut fadeIn").addClass("hidden");
        }, 750);
        this.disaptchEvent(Global.enum.EVENTS.SECTION_ACTION, {"action" : Global.enum.ACTIONS.CARD_DETAIL_BACK});
    };

    onEdit(e){
        let $this = $(this.selector);
        $this.removeClass("slideInLeft slideOutLeft fadeOut fadeIn").addClass("fadeOut");
        Util.callLater(function(){
            $this.removeClass("slideInLeft slideOutLeft fadeOut fadeIn").addClass("hidden");
        }, 750);
        this.disaptchEvent(Global.enum.EVENTS.SECTION_ACTION, {"action" : Global.enum.ACTIONS.CARD_EDIT, "cardData" : this.selectedCard});
    };
}

module.exports = Detail;

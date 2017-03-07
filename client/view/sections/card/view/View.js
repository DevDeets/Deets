const HTML = require("sections/card/view/View.html");
const CardItemHTML = require("sections/card/view/CardItem.html");

//UTILS:
const UIComponent = require("base/UIComponent");
const Util = require("util/Util");
const Event = require("util/Event");
const Loader = require("util/Loader");
const Firebase = require("util/Firebase");
const Sort = require("util/Sort");

//ENUMS:
const Global = require("enum/Global");

class CardsView extends UIComponent{
    constructor(parentSelector) {
        super(parentSelector, HTML);
        this.addEventListeners();
        Firebase.readDataAndListenForChanges("cards", (data) => this.onCardsDataChange(data));
    };

    addEventListeners(){
        Event.addTap(this.selector + " .card-item:not(.isLoading)", e => this.onCardTap(e));
        Event.addTap(this.selector + " .view-control .three", e => this.onAdd(e));
        Event.addGlobalEventListener(Global.enum.EVENTS.SECTION_ACTION, (e) => this.handleSectionAction(e));
    };

    handleSectionAction(event){
        let eventData = event.eventData;
        let action = eventData.action;
        switch(action){
            case Global.enum.ACTIONS.CARD_NEW_BACK:
            case Global.enum.ACTIONS.CARD_DETAIL_BACK: this.cardsBackHandler(); break
        };
    };

    cardsBackHandler(){
        this.show();
    };

    onCardsDataChange(data){
        this.cardsObj = data.val();
        let cards = Sort.sortCardsObj(data.val(), "timestamp");
        $(".content", this.selector).empty();
        for(let i = 0; i < cards.length; i++){
            let card = cards[i];
            this.addHtml(CardItemHTML, card, ".content");
        }
        this.loadCards();
        Util.setApiLoader(false);
    };

    loadCards(){
        let $cards = $(".card-item.isLoading", this.selector);
        this.imgTotal = $cards.length;
        this.imgCount = 0;
        for(let i = 0; i < this.imgTotal; i++){
            let $card = $cards.eq(i);
            let src = $(".card-img-div", $card).attr("data-src");
            Firebase.downloadImage(src, (url, data, w, h) => this.imgLoaded(url, data, w, h), $card);
        }
    };

    imgLoaded(url, $card, w, h){
        this.imgCount++;
        if(url){
            let imgDiv = $(".card-img-div", $card);
            let cardId = $card.attr("id");
            let cardObj = this.cardsObj[cardId];
            let ih = window.innerHeight - 55;
            let maxWidth = (w > 500) ? w : 500;
            cardObj.image_width = w;
            cardObj.image_heigth = h;
            cardObj.img_source = url;
            cardObj.card_width = maxWidth;
            cardObj.card_heigth = ih;

            if(ih > h)
                ih = h;
            imgDiv.css("backgroundImage", "url(" + url + ")");
            imgDiv.css("height", ih + "px");
            imgDiv.css("max-width", maxWidth + "px");

            $card.removeClass("isLoading");
        }
        if(this.imgCount >= this.imgTotal){
            //console.log("Loading complete");
        }
    };

    onImgLoaded(src){
        const $img = $("img", this.selector + ' .portrait');
        const $loader = $(".loader-component", this.selector + ' .portrait');
        $img.attr("src", src).removeClass("hidden");
        $loader.remove();
    };

    onCardTap(e){
        let $this = $(e.currentTarget);
        let cardId = $this.attr("id");
        let cardObj = this.cardsObj[cardId];
        this.hide();
        this.disaptchEvent(Global.enum.EVENTS.SECTION_ACTION, {"action" : Global.enum.ACTIONS.CARD_TAPPED, "cardData" : cardObj});
    };

    onAdd(e){
        this.hide();
        this.disaptchEvent(Global.enum.EVENTS.SECTION_ACTION, {"action" : Global.enum.ACTIONS.CARD_ADD});
    };
}

module.exports = CardsView;

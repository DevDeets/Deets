const Util = require("util/Util");
const Api = require("util/Api");
const Global = require("enum/Global.js");
const Event = require("util/Event");
const UIComponent = require("base/UIComponent");
const HTML = require("sections/card/Card.html");
const CardsView = require("sections/card/view/View");
const CardDetail = require("sections/card/detail/Detail");
const CardEdit = require("sections/card/edit/Edit");

class Card extends UIComponent {
    constructor() {
        super("body", HTML);
        this.createChildren();
        this.addEventListeners();
    };

    createChildren(){
        this.cardsView = new CardsView(this.selector);
        this.cardDetail = new CardDetail(this.selector);
        this.cardEdit = new CardEdit(this.selector);
    }

    addEventListeners(){
        Event.addTap(this.selector + " .card-item", e => this.onCardTap(e));
    };

    onCardTap(e){
        $('ul.tabs', this.selector).tabs('select_tab', 'cardDetail');
    }
}

module.exports = Card;

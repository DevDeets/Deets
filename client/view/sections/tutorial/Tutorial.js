const Util = require("util/Util");
const Api = require("util/Api");
const Event = require("util/Event");
const Loader = require("util/Loader");
const Firebase = require("util/Firebase");
const Model = require("model/Model");

const Global = require("enum/Global.js");
const UIComponent = require("base/UIComponent");
const HTML = require("sections/tutorial/Tutorial.html");
const WelcomeHTML = require("sections/tutorial/Welcome.html");
const LearnMoreHTML = require("sections/tutorial/LearnMore.html");
const WhyDeetsHTML = require("sections/tutorial/WhyDeets.html");

class Tutorial extends UIComponent {
    constructor() {
        super("body", HTML);
        this.createChildren();
    };

    createChildren(){
        this.addHtml(WelcomeHTML);
        this.addHtml(LearnMoreHTML);
        this.addHtml(WhyDeetsHTML);

        Loader.loadImageToSource("/images/welcome.png", this.selector + " #welcome #welcomeImg");
        Loader.loadImageToSource("/images/txtme.png", this.selector + " #learnMore #learnMoreImg");
        Loader.loadImageToSource("/images/haveit.png", this.selector + " #whyDeets #img1");
        Loader.loadImageToSource("/images/clock.png", this.selector + " #whyDeets #img2");
        Loader.loadImageToSource("/images/control.png", this.selector + " #whyDeets #img3");

        $('ul.tabs', this.selector).tabs({"swipeable" : "true"});
        this.updateLayout();
        this.addEventListeners();
        Util.callLater(function(){
            Util.setApiLoader(false);
        }, 100);
    };

    addEventListeners(){
        Event.resize(() => this.updateLayout());
        Event.addTap(this.selector + " #welcome .learn-btn", e => this.onLearnTap(e));
        Event.addTap(this.selector + " #learnMore .why-btn", e => this.onWhyDeetsTap(e));
        Event.addTap(this.selector + " .skip-btn", e => this.onSkipTap(e));
        this.interval = setInterval(() => this.checkSlideIndex(), 750);
    };

    hide(removeAfter){
        clearInterval(this.interval);
        super.hide(removeAfter);
    }

    checkSlideIndex(){
        let $activeItem = $(".carousel-item.active", this.selector);
        let $stepWrapper = $("#stepWrapper", this.selector);
        let id = $activeItem.attr("id");
        switch(id){
            case "welcome" : $stepWrapper.html("1 of 3"); break;
            case "learnMore" : $stepWrapper.html("2 of 3"); break;
            case "whyDeets" : $stepWrapper.html("3 of 3"); break;
        }
    };

    updateLayout(){
        let testIt = function(wrapperHeight, $slide){
            if($slide.height() < wrapperHeight)
                $slide.addClass("valign");
            else
                $slide.removeClass("valign");
        };
        let $getStarted = $(this.selector);
        let height = $getStarted.height();
        testIt(height, $("#welcome .content", $getStarted));
        testIt(height, $("#learnMore .content", $getStarted));
        testIt(height, $("#nextSteps .content", $getStarted));
    };



    onLearnTap(e){
        $('ul.tabs', this.selector).tabs('select_tab', 'learnMore');
    }

    onWhyDeetsTap(e){
        $('ul.tabs', this.selector).tabs('select_tab', 'whyDeets');
    };

    onSkipTap(e){
        Util.setApiLoader(true);
        this.disaptchEvent(Global.enum.EVENTS.SECTION_ACTION, {"action" : Global.enum.ACTIONS.TUTORIAL_COMPLETE});
    };
}

module.exports = Tutorial;

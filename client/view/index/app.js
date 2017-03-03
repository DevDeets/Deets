//UTILS:
const Util = require("util/Util");
const Event = require("util/Event");
const Firebase = require("util/Firebase");

//ENUMS:
const Global = require("enum/Global.js");

//sections:
const Header = require("sections/header/Header");
const Auth = require("sections/auth/Auth");
const GetStarted = require("sections/get_started/GetStarted");
const Tutorial = require("sections/tutorial/Tutorial");
const Card = require("sections/card/Card");

//scss:
require("view/index/main.scss");

class App {
    constructor() {
        if(window.addEventListener){
            window.addEventListener('load', () => this.onReady());
        }
        else{
            window.attachEvent('onload', () => this.onReady());
        }
    };

    onReady(){
        //Initialize objects:
        Firebase.initialze();

        //Event Listeners:
        Event.addGlobalEventListener(Global.enum.EVENTS.SECTION_ACTION, (e) => this.handleSectionAction(e));

        // App is ready to start.
        this.sections = {};
        this.sections.header = new Header();
        this.sections.auth = new Auth();
        this.initTextInputs();

        //This should be called after all Section reported ready state.
        this.sections.header.onAppReady();
    };

    initTextInputs(){
        //Call After all ui is on dom:
        Util.callLater(function(){
            Materialize.updateTextFields();
        });
    }

    handleSectionAction(event){
        let eventData = event.eventData;
        let action = eventData.action;
        switch(action){
            case Global.enum.ACTIONS.REGISTERED: this.registeredHandler(); break;
            case Global.enum.ACTIONS.GET_STARTED_COMPLETE: this.getStartedDoneHandler(); break;
            case Global.enum.ACTIONS.LOGGED_IN: this.loggedInHandler(); break;
            case Global.enum.ACTIONS.TUTORIAL_COMPLETE: this.onTutorialDone(); break;
        }
    }

    getStartedDoneHandler(){
        this.sections.tutorial = new Tutorial();
        this.sections.getStarted.hide(true);
    }

    registeredHandler(){
        this.sections.getStarted = new GetStarted();
        this.sections.auth.hide(true);
        this.initTextInputs();
    }

    loggedInHandler(){
        this.sections.auth.hide(true);
        this.initLoggedInState();
    }

    onTutorialDone(){
        this.sections.tutorial.hide(true);
        this.initLoggedInState();
    }

    initLoggedInState(){
        this.sections.cards = new Card();
        //Firebase.readDataOnce("cards", (data) => this.onCardsLoaded(data));
    }
}

module.exports = App;

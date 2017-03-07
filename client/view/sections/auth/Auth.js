const Util = require("util/Util");
const Api = require("util/Api");
const Global = require("enum/Global");
const Model = require("model/Model");
const Event = require("util/Event");
const Firebase = require("util/Firebase");
const Validator = require("util/Validator");
const UIComponent = require("base/UIComponent");
const HTML = require("sections/auth/Auth.html");

class Auth extends UIComponent {
    constructor() {
        super("body", HTML);
        $('ul.tabs', this.selector).tabs();
        this.addEventListeners();
    };

    addEventListeners(){
        Event.addTap(this.selector + " #login .login-btn", e => this.onLogin(e));
        Event.addTap(this.selector + " #login #passwordForgotLink", e => this.onForgotPasswordTap(e));
        Event.addTap(this.selector + " #register .regi-btn", e => this.onRegister(e));
        Event.addTap(this.selector + " #register #termsLink", e => this.onTermsTap(e));
        Event.addTap(this.selector + " #register #privacyLink", e => this.onTermsTap(e));
        Event.addTap(this.selector + " #register .passToggle", e => this.onPasswordToggle(e));
        Event.addTap(this.selector + " .dismiss-btn", e => this.onPopupDismiss(e));
    };

    validateForm($inpt, phTxt){
        let isValid = true;
        if(!$inpt.hasClass("valid")){
            $inpt.addClass("invalid");
            $("label", $inpt.parent()).addClass("active");
            isValid = false;
            if(phTxt)
                $inpt.attr("placeholder", phTxt);
        }
        return isValid;
    };

    onPasswordToggle(){
        let $passToggle = $(this.selector + " #register .passToggle");
        let passwordIsHidden = $passToggle.hasClass("isHidden");
        let $passInpt = $(this.selector + " #regiPass");
        if(passwordIsHidden){
            $passInpt.attr("type", "text");
            $passToggle.html($passToggle.attr("data-hide"));
            $passToggle.removeClass("isHidden");
        }
        else{
            $passInpt.attr("type", "password");
            $passToggle.html($passToggle.attr("data-show"));
            $passToggle.addClass("isHidden");
        }
    };

    onPopupDismiss(){
        let $termsPopup = $("#terms");
        //$termsPopup.removeClass("active");
    };

    onTermsTap(){
        let $termsPopup = $("#terms");
        //$termsPopup.addClass("active");
    };

    onForgotPasswordTap(){
        //console.log("password reset");
    };

    onLogin(){
        let $emailInpt = $(this.selector + " #email");
        let $passInpt = $(this.selector + " #pass");
        let emailIsValid = this.validateForm($emailInpt, "Your email address");
        let passIsValid = this.validateForm($passInpt, "Your password");
        $(this.selector + " #login .errorWrapper").addClass("hidden");
        if(emailIsValid && passIsValid){
            Util.setApiLoader(true);
            Firebase.login($emailInpt.val(), $passInpt.val(), (user) => this.onLoginDone(user));
        }
    };

    onLoginDone(userData){
        if(userData && userData.uid){
            this.disaptchEvent(Global.enum.EVENTS.SECTION_ACTION, {"action" : Global.enum.ACTIONS.LOGGED_IN});
        }
        else{
            $(this.selector + " #login .errorWrapper").removeClass("hidden");
            Util.setApiLoader(false);
        }
    }

    onRegister(){
        //FOR QUICK STARTUP ONLY:
        //this.onUserStateUpdated({eventData: {action : Global.enum.ACTIONS.USER_STATE_CHANGED}});
        //return;

        let $emailInpt = $(this.selector + " #regiEmail");
        let $passInpt = $(this.selector + " #regiPass");
        let emailIsValid = this.validateForm($emailInpt, "Your email address");
        let passIsValid = this.validateForm($passInpt, "Your password");
        $(this.selector + " #register .errorWrapper").addClass("hidden");
        if(emailIsValid && passIsValid){
            Util.setApiLoader(true);
            Firebase.logout(() => {
                Firebase.register($emailInpt.val(), $passInpt.val(), (user) => this.onRegisterDone(user));
            });
        }
    };

    onRegisterDone(userData){
        if(userData && userData.uid){
            // we need to wait until registered user is logged in, before moving to next step.
            Event.addGlobalEventListener(Global.enum.EVENTS.API_EVENT, (e) => this.onUserStateUpdated(e));
        }
        else{
            let $errMsg = $(this.selector + " #register .errorWrapper").removeClass("hidden");
            $(".errorMsg", $errMsg).html(userData.message);
            Util.setApiLoader(false);
        }
    };

    onUserStateUpdated(event){
        let eventData = event.eventData;
        let action = eventData.action;

        switch(action){
            case(Global.enum.ACTIONS.USER_STATE_CHANGED):
                if(Model.user){
                    Event.removeGlobalEventListener(Global.enum.EVENTS.API_EVENT, (e) => this.onUserStateUpdated(e));
                    this.disaptchEvent(Global.enum.EVENTS.SECTION_ACTION, {"action" : Global.enum.ACTIONS.REGISTERED});
                }
                break;
        }
    }
}

module.exports = Auth;
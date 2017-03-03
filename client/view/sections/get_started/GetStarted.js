const Util = require("util/Util");
const Api = require("util/Api");
const Event = require("util/Event");
const Loader = require("util/Loader");
const Firebase = require("util/Firebase");
const Model = require("model/Model");
const Global = require("enum/Global.js");

const UIComponent = require("base/UIComponent");
const GetStartedHTML = require("sections/get_started/GetStarted.html");

class GetStarted extends UIComponent {
    constructor() {
        super("body", GetStartedHTML);
        this.addEventListeners();
        this.initGetStarted();
        //Materialize.updateTextFields();
    };

    initGetStarted(){
        let $getStarted = $("#getStarted", this.selector);
        let $emailInpt = $(this.selector + " #email");
        let email = (Model.user) ? Model.user.email : "";
        $emailInpt.val(email).trigger("change");
        Util.setApiLoader(false);
        $getStarted.removeClass("hidden");
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

    addEventListeners(){
        //FORM:
        Event.addTap(this.selector + " .create-btn", e => this.onCreateTap(e));
        Event.addChange(this.selector + " .file-path", e => this.onFileChange(e));
    };

    onFileChange(e){
        let $input = $("#file_input_file", this.selector);
        let $div = $(".img-preview-wrapper .img-preview", this.selector);
        $("#browseErrorLabel").addClass("hidden");
        Loader.loadImageFileIntoDiv($input, $div);
    }

    onCreateTap(){
        //this.onCardCreated(true);
        //return;
        //required:
        let $cardNameInpt = $(this.selector + " #cardName");
        let $nameInpt = $(this.selector + " #name");
        let $emailInpt = $(this.selector + " #email");
        let $phoneInpt = $(this.selector + " #phone");
        let $browseInpt = $(this.selector + " #file_input_file");

        let cardNameIsValid = this.validateForm($cardNameInpt);
        let nameIsValid = this.validateForm($nameInpt);
        let emailIsValid = this.validateForm($emailInpt);
        let phoneIsValid = this.validateForm($phoneInpt);
        let cardSrcIsValid = ($browseInpt.val().length > 0);

        //optional:
        let $companyInpt = $(this.selector + " #company");
        let $jobTitleInpt = $(this.selector + " #jobTitle");
        let $streetAddressInpt = $(this.selector + " #streetAddress");
        let $cityInpt = $(this.selector + " #city");
        let $stateInpt = $(this.selector + " #state");
        let $zipInpt = $(this.selector + " #zip");

        if(!cardSrcIsValid) {
            $("#browseErrorLabel").removeClass("hidden");
        }

        if(cardNameIsValid && nameIsValid && emailIsValid && phoneIsValid && cardSrcIsValid){
            Util.setApiLoader(true);
            //save:
            Firebase.updateUserData({
                name : $nameInpt.val(),
                email : $emailInpt.val(),
                phone : $phoneInpt.val(),
                company_name : $companyInpt.val(),
                job_title : $jobTitleInpt.val(),
                job_street : $streetAddressInpt.val(),
                job_city : $cityInpt.val(),
                job_state : $stateInpt.val(),
                job_zip : $zipInpt.val()
            }, saved => this.onUserDataDone(saved));
        }
    }

    onUserDataDone(saved){
        if(saved){
            let $browseInpt = $(this.selector + " #file_input_file");
            let imgFile = $browseInpt[0].files[0];
            Firebase.uploadImage(imgFile, imgFile.name, (uploaded, imgUrl) => this.onImageUploaded(uploaded, imgUrl));
        }
        else{
            // TODO: handle error.
        }
    };

    onImageUploaded(uploaded, imgUrl){
        if(uploaded){
            //required:
            let $cardNameInpt = $(this.selector + " #cardName");
            let $nameInpt = $(this.selector + " #name");
            let $emailInpt = $(this.selector + " #email");
            let $phoneInpt = $(this.selector + " #phone");
            //optional:
            let $companyInpt = $(this.selector + " #company");
            let $jobTitleInpt = $(this.selector + " #jobTitle");
            let $streetAddressInpt = $(this.selector + " #streetAddress");
            let $cityInpt = $(this.selector + " #city");
            let $stateInpt = $(this.selector + " #state");
            let $zipInpt = $(this.selector + " #zip");

            Firebase.addCard({
                card_name : $cardNameInpt.val(),
                name : $nameInpt.val(),
                email : $emailInpt.val(),
                phone : $phoneInpt.val(),
                card_url : imgUrl,
                company : $companyInpt.val(),
                job_title : $jobTitleInpt.val(),
                job_street : $streetAddressInpt.val(),
                job_city : $cityInpt.val(),
                job_state : $stateInpt.val(),
                job_zip : $zipInpt.val(),
            }, (saved) => this.onCardCreated(saved));
        }
        else{
            // TODO: handle error.
        }
    }

    onCardCreated(saved){
        if(saved){
            this.disaptchEvent(Global.enum.EVENTS.SECTION_ACTION, {"action" : Global.enum.ACTIONS.GET_STARTED_COMPLETE});
        }
        else{
            // TODO: handle error.
        }
    }
}

module.exports = GetStarted;

class Global {

    static get enum() {
        if (!Global._enum) {
            Global._enum = {
                SMALL: "small",
                MEDIUM: "mednium",
                LARGE: "large",
                EVENTS : {
                    SECTION_ACTION : "Section-Action",
                    API_EVENT : "Api-Event",
                    USER_STATE_CHANGED : "user state changed"
                },
                ACTIONS : {
                    //sections
                    REGISTERED : "user registered",
                    LOGGED_IN : "user logged in",
                    GET_STARTED_COMPLETE : "get started done",
                    TUTORIAL_COMPLETE : "tutorial done",
                    CARD_TAPPED : "card was tapped",
                    CARD_DETAIL_BACK : "Back from card detail view",
                    CARD_EDIT : "Edit from card detail view",
                    CARD_EDIT_BACK : "Back from card Edit view",
                    CARD_NEW_BACK : "Back from new card view",
                    CARD_ADD : "Add from cards view"
                }
            };
        }
        return Global._enum;
    }

    static get cardVO(){
        return [{card_name : "Card Name"},
                {name : "Your Name"},
                {email : "Email"},
                {phone : "Phone"},
                {company : "Company"},
                {job_title : "Job Title"},
                {job_street : "Job Street"},
                {job_street : "Job Street"},
                {job_zip : "Job Zip"}];
    }
}

module.exports = Global;
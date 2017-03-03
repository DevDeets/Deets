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
                    REGISTERED : "user registered",
                    LOGGED_IN : "user logged in",
                    GET_STARTED_COMPLETE : "get started done",
                    TUTORIAL_COMPLETE : "tutorial done",
                    CARD_TAPPED : "card was tapped"
                }
            };
        }
        return Global._enum;
    }
}

module.exports = Global;
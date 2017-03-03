class History {
    static init(cb){
        window.onpopstate = cb || History.onPopState;
    };

    static newState($section){
        let hashVal = $section.attr("data-hash");
        let idVal = $section.attr("id");
        let stateObj = { id: idVal };
        let hashValue = (hashVal) ? "#" + hashVal : "#index";
        history.pushState(stateObj, "", hashValue);
    }

    static onPopState(event){
        alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
    }
}

module.exports = History;
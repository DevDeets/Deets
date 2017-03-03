class Id {
    static get ids(){
        if(!Id._ids)
            Id._ids= {};
        return Id._ids;
    };

    static getID(){
        var newId = Id.UID();
        if(Id.ids[newId] == undefined)
        {
            Id.ids[newId] = newId;
            return newId;
        }
        return Id.getID();
    };

    static s4(){
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    static UID(){
        return "UID_" + Id.s4() + Id.s4();
    };
}

module.exports = Id;
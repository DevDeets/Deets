class Sort {
    static sortCardsObj(cardsObj, byProp){
        let cards = [];
        let filterCardObj = function(cardA, cardB){
            if(cardA[byProp] < cardB[byProp])
                return -1;
            if(cardA[byProp] > cardB[byProp])
                return 1;
            return 0;
        };

        for(let propName in cardsObj){
            console.log(propName);
            let card = cardsObj[propName];
            card.uid = propName;
            cards.push(card);
        }
        return cards.sort(filterCardObj);
    };
}

module.exports = Sort;
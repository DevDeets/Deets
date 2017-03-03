const Mustache = require("runTime/js/mustache.min.js");
const Number = require("util/Number");
const Util = require("util/Util");
const History = require("util/History");

class Html {

    static append(parent, HTML, data, addFirst){
        var rendered = Mustache.render(HTML, data);
        if(addFirst)
            $(parent).prepend(rendered);
        else
            $(parent).append(rendered);
    };

    static hideOrShowParentNKids($parent, isShow, cb){
        let kids = $(".kid", $parent);
        let maxWaitTime = 0;
        let cls = isShow ? "fadeIn" : "fadeOut";
        kids.removeClass("animated fadeIn fadeOut")
        if(isShow){
            kids.css("opacity", "0");
            $parent.removeClass("invisibile");
        }

        let stateHandler = function($kid, waitTime){
            Util.callLater(function(){
                $kid.css("opacity", "1");
                $kid.addClass("animated " + cls);
            }, waitTime);
        };
        for(let i = 0; i < kids.length; i++){
            let $kid = $(kids[i]);
            let waitTime = Number.getRandom(0, 750);
            if(waitTime > maxWaitTime)
                maxWaitTime = waitTime;
            stateHandler($kid, waitTime);
        };
        Util.callLater(function(){
            if(!isShow)
                $parent.addClass("invisibile");
            cb();
        }, maxWaitTime + 750);
    };

    static hideOrShowParent($parent, isShow, cb){
        let cls = isShow ? "fadeIn" : "fadeOut";
        $parent.removeClass("animated fadeIn fadeOut invisibile");
        if(isShow){
            $parent.addClass("animated fadeIn");
            History.newState($parent);
        }
        else{
            $parent.addClass("animated fadeOut");
        }
        Util.callLater(function(){
            if(!isShow){
                $parent.addClass("invisibile");
            }
            cb();
        }, 750);
    };

    static hideView($view, cb){
        $view.removeClass("animated fadeIn fadeOut invisibile");
        $view.addClass("animated fadeOut");
        Util.callLater(function(){
            $view.addClass("invisibile");
            cb();
        }, 750);
    };

    static showView($view, addToHistory, cb){
        $view.removeClass("animated fadeIn fadeOut invisibile");
        $view.addClass("animated fadeIn");
        if(addToHistory){
            History.newState($view);
        }
        Util.callLater(function(){
            cb();
        }, 750);
    };
}

module.exports = Html;

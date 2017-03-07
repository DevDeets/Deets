const Event = require("util/Event.js");
const GLOBAL = require("enum/Global.js");

class Util {

    static get viewState(){
        if(!Util._viewState){
            Event.resize(Util.onResize);
            Util.onResize();
        }
        return Util._viewState;
    }

    static onResize() {
        var isSmall = (JQ.getJQ(".hide-on-small-only", "#sizer").css("display") == "none");
        var isMedium = (JQ.getJQ(".hide-on-med-only", "#sizer").css("display") == "none");
        var isLarge = (JQ.getJQ(".hide-on-large-only", "#sizer").css("display") == "none");
        if (isSmall) {
            Util._viewState = GLOBAL.enum.SMALL;
        }
        else if (isMedium) {
            Util._viewState = GLOBAL.enum.MEDIUM;
        }
        else if (isLarge) {
            Util._viewState = GLOBAL.enum.LARGE;
        }
    }

    static scrollToBodyElmt(selector, offset = 0)
    {
        if(selector){
            //let JQ = require("utils/JQ.js");
            let $body = $('body,html');
            let $elmt = $(selector);
            if($elmt && $elmt.length > 0){
                let scrollTo = $elmt.offset().top - 100; // 80 for a header offset
                if(offset)
                    scrollTo = scrollTo - offset;
                let currentScrollVal = $body.scrollTop();
                let totalDist = Math.abs(currentScrollVal - scrollTo);
                if(totalDist > 3000)
                    totalDist = totalDist / 3;
                else if(totalDist > 2000)
                    totalDist = totalDist / 2;
                $body.stop(true, true).animate({
                    scrollTop: scrollTo
                }, totalDist);
            }
        }
    }

    static hScrollToElmtCenter($parent, $child)
    {
        var w = $parent.width() / 2 - $child.width()/2;
        var scrollTo = $parent.scrollLeft() + $child.offset().left - w; // w for centering
        $parent.stop(true, true).animate({
            scrollLeft: scrollTo
        }, 250);
    }

    static callLater(cb, delay, data){
        if(delay === undefined){delay = 0;}
        return setTimeout(function(){cb(data);}, delay);
    }

    static callEvery(cb, delay, data){
        if(delay === undefined){delay = 500;}
        return setInterval(function(){cb(data);}, delay);
    }

    static setApiLoader(show){
        let $loader = $(".api-loader");
        let $directSections = $("body > section");
        if(show){
            $loader.css("display","block").addClass("active").removeClass("hidden");
            $directSections.addClass("loading");
        }
        else{
            $loader.removeClass("active").addClass("hidden");
            $directSections.removeClass("loading");
        }
    }

    static getFirstPropName(obj){
        for(let propName in obj){
            return propName;
        }
        return null;
    }
}

module.exports = Util;



/*



 viewState : undefined,

 enum : {
 SMALL : "small",
 MEDIUM : "medium",
 LARGE : "large"
 },
 */
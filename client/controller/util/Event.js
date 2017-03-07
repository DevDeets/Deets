class Event {

    static addTap(selector, cb){
        $(document).on("tap click", selector, cb);
    };

    static addTouchstart(selector, cb){
        $(document).on("touchstart", selector, cb);
    };

    static addChange(selector, cb){
        $(document).on("change", selector, cb);
    };

    static addSwipe(selector, cb){
        $(document).on("swipeleft", selector, function(e){
            console.log("SWIPEeeee");
            console.log(e);
        });
    }

    static bindEventListener(selector, type, cb, isJQ){
        let $jobj = isJQ ? selector : $(selector);
        $jobj.bind(type, cb);
    };

    static unbindEventListener(selector, type, cb, isJQ){
        let $jobj = isJQ ? selector : $(selector);
        $jobj.unbind(type, cb);
    };

    static dispatchGlobalEvent(name, data){
        var event = $.Event( name );
        event.eventData = data;
        $(document).trigger(event);
    }

    static addGlobalEventListener(name, cb){
        Event.bindEventListener(document, name, cb, false);
        //$(document).on(name, cb);
    }

    static removeGlobalEventListener(name, cb){
        Event.unbindEventListener(document, name, cb, false);
    }

    static resize(cb)
    {
        if(!Event._resizeCallBacks){
            Event._resizeCallBacks = [];
            window.onresize = function(){
                if(Event.resizing)
                    return;
                Event.resizing = true;
                setTimeout(function(){
                    for(let idx in Event._resizeCallBacks){
                        var fn = Event._resizeCallBacks[idx];
                        fn();
                    };
                    Event.resizing = false;
                }, 200);
            };
        }
        Event._resizeCallBacks.push(cb);
    }

    static onScroll(selector, cb){
        $(selector).scroll(cb);
    }
}

module.exports = Event;


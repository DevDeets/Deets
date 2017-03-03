class Loader {

    static loadFromInputIntoImage($input, $img){
        let input = $input[0];
        if (input && input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $img.attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    static loadImageFileIntoDiv($input, $div){
        let input = $input[0];
        if (input && input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onloadend = function(){
                $div.css("backgroundImage", "url(" + reader.result + ")").parent().removeClass("hidden");
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    static loadImageToSource(url, imgSelector, cb, progressCB)
    {
        let $img = $(imgSelector);
        $img.attr("src", "/images/loading.jpg");
        Loader.loadImage(url, function(src){
            setTimeout(function(){
                $img.attr("src", src);
                if(cb)
                    cb();
            }, 0);
        });
    }

    static loadImageAndGetSize(path, cb){
        var img = new Image();
        img.onload = function() {
            cb(this.width, this.height);
        };
        img.src = path;
    }

    static loadImage(url, cb, progressCB, data)
    {
        let request = new XMLHttpRequest();
        request.onerror = () => { cb(null); };
        request.onprogress = progressCB;
        request.onloadend = (event) => {
            let status = event.target.status;
            if(status === 200)
            {
                let src = "data:image/jpeg;base64," + Loader.base64Encode(request.responseText);
                cb(src, data);
            }
            else
            {
                cb(null);
            }
        };
        request.open("GET", url, true);
        request.overrideMimeType('text/plain; charset=x-user-defined');
        request.send(null);
    };

    static loadJson(url, cb){
        $.getJSON(url, cb).done(function() {
            //console.log( "done" );
        }).fail(function() {
            //console.log( "error" );
        })
        .always(function() {
            //console.log( "complete" );
        });
    };

    static base64Encode(inputStr)
    {
        let b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        let outputStr = "";
        let i = 0;
        while (i < inputStr.length)
        {
            let byte1 = inputStr.charCodeAt(i++) & 0xff;
            let byte2 = inputStr.charCodeAt(i++) & 0xff;
            let byte3 = inputStr.charCodeAt(i++) & 0xff;
            let enc1 = byte1 >> 2;
            let enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);
            let enc3, enc4;

            if (isNaN(byte2))
            {
                enc3 = enc4 = 64;
            }
            else
            {
                enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
                if (isNaN(byte3))
                {
                    enc4 = 64;
                }
                else
                {
                    enc4 = byte3 & 63;
                }
            }
            outputStr += b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4);
        }

        return outputStr;
    };
}

module.exports = Loader;

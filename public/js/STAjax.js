
var STAjax = (function () {
    function STAjax () {
        this.responseType = null;
        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
        this.canUseBlob = window.Blob || window.BlobBuilder;
        var protocol = location.protocol;
        this.local = !(protocol == "http:" || protocol == "https:");
    }
    STAjax.prototype = {
        TEXT : "text",
        JSON : "json",
        ARRAY_BUFFER : "arraybuffer",
        BLOB : "blob",
        get : function (url, data, oncomplete, onerror) {
            this.getRequest("GET", url, data, oncomplete, onerror);
        },
        post : function (url, data, oncomplete, onerror) {
            this.getRequest("POST", url, data, oncomplete, onerror);
        },
        getRequest : function (t, url, d, oncomplete, err) {
            var s = this, k, data = "", a = "";
            s.err = err;
            var ajax = s.getHttp();
            if (!ajax) {
                return;
            }
            if (d) {
                for (k in d) {
                    data += (a + k + "=" + d[k]);
                    a = "&";    
                }
            }
            if (t.toLowerCase() == "get" && data.length > 0) {
                url += ((url.indexOf('?') >= 0 ? '&' : '?') + data);
                data = null;
            }
            ajax.onerror = function(e){
                if(err){
                    err(e);
                    err = null;
                }
            };
            var progress = s.progress;
            s.progress = null;
            ajax.addEventListener("progress", function(e){
                if(e.currentTarget.status == 404){
                    if (err) {
                        err(e.currentTarget);
                        err = null;
                    }
                }else if(e.currentTarget.status == 200){
                    if(progress){
                        progress(e);
                    }
                }
            }, false);
            ajax.open(t, url, true);
            if (s.responseType) {
                if(s.responseType == s.JSON){
                    try{
                        ajax.responseType = s.responseType;
                    }catch(e){
                        ajax.responseType = s.TEXT;
                        ajax._responseType = "json";
                    }
                }else{
                    ajax.responseType = s.responseType;
                }
                s.responseType = s.TEXT;
            }
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.onreadystatechange = function (e) {
                var request = e.currentTarget;
                if (request.readyState == 4) {
                    if (request.status >= 200 && request.status < 300 || request.status === 304) {
                        if (oncomplete) {
                            if(request._responseType == s.JSON){
                                request._responseType = s.TEXT;
                                oncomplete(JSON.parse(request.responseText));
                            }else if (request.responseType == s.ARRAY_BUFFER || request.responseType == s.BLOB || request.responseType == s.JSON) {
                                oncomplete(request.response);
                            } else if (request.responseText.length > 0) {
                                oncomplete(request.responseText);
                            } else {
                                oncomplete(null);
                            }
                        }
                    } else {
                        if (err) {
                            err(request);
                            err = null;
                        }
                    }
                }
            };
            ajax.send(data);
        },
        getHttp : function () {
            if (typeof XMLHttpRequest != UNDEFINED) {
                return new XMLHttpRequest();
            }  
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    if (!this.err) {
                        this.err(e);
                    }
                }
            }
            return false;
        }
    };
    return new STAjax();
})();
    

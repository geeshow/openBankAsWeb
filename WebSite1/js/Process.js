var me = function () {
}
me.onload = function () {
    try {
        $(".bizTreeMenu").click(function () {
            me.showLayer(this.id.replace("menu", "biz"), "biz");
            me.showLayer(this.id.replace("menu", "tbar"), "tbar");
        });
    }
    catch (e) {
        log.error("onload", e);
    }
    finally {
        log.debug("onload", this);
    }
}
me.showLayer = function (code, type) {
    try {
        if (!LayerPool.isLayer(code)) {
            me.createLayer(code, type);
        }
        
        var layer = LayerPool.getLayer(code);
        me.saveShowingLayer(layer);
        layer.hide(layer.showingLayer.code); // 이전화면 숨김
        layer.show(layer);
    }
    catch (e) {
        log.error("showLayer", e);
    }
    finally {
        log.debug("showLayer", this);
    }
}
me.createLayer = function (code, type) {
    try {
        var newLayer;
        if (type == "biz") {
            newLayer = new BizLayer(code);
        }
        else if (type == "tbar") {
            newLayer = new TBarLayer(code);
        }
        LayerPool.addLayer(newLayer);

        var source = newLayer.getServerSource(code); // HTML 소스 가져오기
        source = newLayer.bindInSource(source, newLayer.bindCode, code); // HTML 소스상 특정문자를 CODE로 변경
        newLayer.hide(newLayer.showingLayer.code); // 이전화면 숨김
        newLayer.pushHtml(source); // 소스화면에 적용
        newLayer.setEvent(code);
    }
    catch (e) {
        log.error("createLayer", e);
    }
    finally {
        log.debug("createLayer", this);
    }
}

me.deleteLayer = function (code) {
    try {
        LayerPool.deleteLayer(code);
        $("#" + code).html("");
    }
    catch (e) {
        log.error("deleteLayer", e);
    }
    finally {
        log.debug("deleteLayer", this);
    }

}
me.saveShowingLayer = function (layer) {
    try {
        if (typeof layer.showingLayer.code != "undefined") {
            layer.showingLayer.saveLayerData();
            //LayerPool.setLayer(layer.showingLayer);
        }
    }
    catch (e) {
        log.error("saveShowingLayer", e);
    }
    finally {
        log.debug("saveShowingLayer", this);
    }
}
me.getType = function (code) {
    try {

    }
    catch (e) {
        log.error("getType", e);
    }
    finally {
        log.debug("getType", this);
    }

    return code;
}

me.getTitle = function (code) {
    try {

    }
    catch (e) {
        log.error("getTitle", e);
    }
    finally {
        log.debug("getTitle", this);
    }

    return code;
}
$(document).ajaxComplete(function () {
    $("#status").text("Triggered ajaxComplete handler.");
});
$(document).ajaxError(function () {
    $("#status").text("Error.");
});

var log = new function () {
    this.mode = "debug";
    this.level = 1;
    this.eventCnt = 0;
    this.error = function (msg, e) {
        $("#info").append("error [" + msg + "]" + e);
    }
    this.info = function (msg, e) {
        $("#info").append("[" + msg + "]" + e);
    }
    this.debug = function (msg, obj) {
        if (this.mode == "debug") {
            $("#info").append("[" + this.eventCnt + "] " + msg + "<br>");
            $("#info").scrollTop($("#info").scrollTop() + 100);
        }
    }

    if (this.mode == "debug") {
        $(document).ready(function () {

            $("a").click(function (event) {
                log.eventCnt++;
                log.debug("-----------------------------------------");
                log.debug("click! " + event.currentTarget.innerHTML);
            });

        });
    }
}


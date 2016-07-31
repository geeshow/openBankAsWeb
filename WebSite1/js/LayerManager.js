var me = function () {
}
me.onload = function () {
    try {
        $(".bizTreeMenu").click(function () {
            me.showLayer(this.id.replace("menu", "biz"), "biz");
            me.showLayer(this.id.replace("menu", "tbar"), "tbar");
        });
        $(".layerTopBtn").click(function (aa) {
        });
        
    }
    catch (e) {
        log.error("me.onload", e);
    }
    finally {
        log.debug("me.onload");
    }
}
me.showLayer = function (code, type) {
    try {
        if (!LayerPool.isLayer(code)) {
            me.createLayer(code, type);
        }
        
        var layer = LayerPool.getLayer(code);
        layer.show(layer);
    }
    catch (e) {
        log.error("me.showLayer", e);
    }
    finally {
        log.debug("me.showLayer");
    }
}
me.showPreLayer = function (layer) {
    try {
        var preCode = layer.getPreCode();
        if (typeof preCode != "undefined" && preCode != "") {
            this.showLayer(preCode);
        }
    }
    catch (e) {
        log.error("me.showPreLayer", e);
    }
    finally {
        log.debug("me.showPreLayer");
    }
}
me.hidePreLayer = function (layer) {
    try {
        var preCode = layer.getPreCode();
        if (typeof preCode != "undefined" && preCode != "") {
            layer.hide(preCode);
        }
    }
    catch (e) {
        log.error("me.hidePreLayer", e);
    }
    finally {
        log.debug("me.hidePreLayer");
    }
}
me.createLayer = function (code, type) {
    log.debug("me.createLayer start");
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
        newLayer.pushHtml(source); // 소스화면에 적용
        newLayer.setEvent(code);
    }
    catch (e) {
        log.error("me.createLayer", e);
    }
    finally {
        log.debug("me.createLayer");
    }
}

me.closeLayer = function (code) {
    log.debug("me.closeLayer start");
    try {
        var layer = LayerPool.getLayer(code);
        layer.destory(code);
        this.showPreLayer(layer);
        LayerPool.deleteLayer(code);
    }
    catch (e) {
        log.error("me.closeLayer", e);
    }
    finally {
        log.debug("me.closeLayer");
    }

}
me.hideLayer = function (code) {
    try {
        var layer = LayerPool.getLayer(code);
        layer.hide(code);
        this.showPreLayer(layer);
    }
    catch (e) {
        log.error("me.closeLayer", e);
    }
    finally {
        log.debug("me.closeLayer");
    }

}
me.getType = function (code) {
    try {

    }
    catch (e) {
        log.error("me.getType", e);
    }
    finally {
        log.debug("me.getType");
    }

    return code;
}

me.getTitle = function (code) {
    try {

    }
    catch (e) {
        log.error("me.getTitle", e);
    }
    finally {
        log.debug("me.getTitle");
    }

    return code;
}
$(document).ajaxComplete(function () {
    $("#status").text("Triggered ajaxComplete handler.");
});
$(document).ajaxError(function () {
    $("#status").text("Error.");
});



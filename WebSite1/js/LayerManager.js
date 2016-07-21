var ajaxReturn = [];
function Layer(code) {
    this.code = code;
    this.source = "";
    this.title = code;
}
Layer.prototype.setSource = function (source) {
    this.source = source;
}
Layer.prototype.getTitle = function () {
    return this.title;
}
Layer.prototype.getServerSource = function (code) {
    var url = this.getUrl(code);
    $.ajax({
        type: "GET"
        , url: url
        , data: {}
        , async: false
    }).done(function (source) {
        ajaxReturn[this.url] = source;
    });
    return ajaxReturn[url];
}
Layer.prototype.bindInSource = function (source, bindName, value) {
    return source.replace(new RegExp(bindName, 'gi'), value);
}
Layer.prototype.show = function (code) {
}
Layer.prototype.hide = function (code) {
}
Layer.prototype.saveLayerData = function () {
    return [];
}
Layer.prototype.getShowingCode = function () { }
Layer.prototype.getPreCode = function() {}

// Layer 상속
function BizLayer(code) {
    Layer.call(this, code);
    this.type = "biz";
    this.bindCode = "%bizCode%";
    this.data;
}
BizLayer.prototype = new Layer();
BizLayer.prototype.layerStack = [];
BizLayer.prototype.getUrl = function (code) {
    return "/" + code.replace(/_/g, '/') + ".html?time=" + (new Date()).getTime();
}
BizLayer.prototype.show = function (layer) {
    try {
        if (typeof layer.code == "string") {
            $("#" + layer.code).show();
            $("#title").html(layer.getTitle());
            if (BizLayer.prototype.layerStack[BizLayer.prototype.layerStack.length - 1] != layer.code)
                BizLayer.prototype.layerStack.push(layer.code);
            DD("layerStack ", BizLayer.prototype.layerStack);
        }
    }
    catch (e) {
        log.error("BizLayer.prototype.show", e);
    }
    finally {
        log.debug("BizLayer.prototype.show");
    }
}
BizLayer.prototype.hide = function (code) {
    DD(7,code);
    if (typeof code == "string") {
        DD(8);
        $("#" + code).hide();
        DD(9);
    }
}
BizLayer.prototype.pushHtml = function (source) {
    $("#content").append(source);
}
BizLayer.prototype.setEvent = function (code) {

}
BizLayer.prototype.getJQObject = function (code) {
    return $("#" + code);
}
BizLayer.prototype.saveLayerData = function () {
    this.data = $("#contentForm").serializeArray();
}
BizLayer.prototype.getShowingCode = function () {
    return $(".bizPages:visible").attr("id");
}
BizLayer.prototype.destory = function (code) {
    try {
        $("#" + code).remove();
        var newLayerStack = [];
        for ( var i = 0 ; i < BizLayer.prototype.layerStack.length ; i++ ) {
            if (BizLayer.prototype.layerStack[i] != code)
                newLayerStack.push(BizLayer.prototype.layerStack[i]);
        }

        BizLayer.prototype.layerStack = newLayerStack;
    }
    catch (e) {
        log.error("BizLayer.prototype.destory", e);
    }
    finally {
        log.debug("BizLayer.prototype.destory");
    }
}
BizLayer.prototype.getPreCode = function () {
    return BizLayer.prototype.layerStack.pop();
}

// Layer 상속
function TBarLayer(code) {
    Layer.call(this, code);
    this.type = "tbar";
    this.bindCode = "%bizCode%";
}
TBarLayer.prototype = new Layer();
TBarLayer.prototype.getUrl = function (code) {
    return "/component/taskbar.html?time=" + (new Date()).getTime();
}

TBarLayer.prototype.pushHtml = function (source) {
    $("#tbarArea").append(source);
}
TBarLayer.prototype.setEvent = function (code) {
    $("#title_" + code).click(function () {
        me.showLayer(code.replace("tbar", "biz"), "biz");
    });
    $("#close_" + code).click(function () {
        DD("code", code);
        me.closeLayer(code);
        me.closeLayer(code.replace("tbar", "biz"), "biz");
    });
}
TBarLayer.prototype.getJQObject = function (code) {
    return $("#" + code);
}
TBarLayer.prototype.destory = function (code) {
    $("#" + code).remove();
}
TBarLayer.prototype.show = function (layer) {
    DD("show", layer.code);
    $("#" + layer.code).css({backgroundColor:"#fff29d",color:"#000000"});
}
TBarLayer.prototype.hide = function () {
    $(".taskbar").css({ backgroundColor: "#364e6f", color: "#ffffff" });
}
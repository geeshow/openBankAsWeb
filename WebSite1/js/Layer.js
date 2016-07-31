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
Layer.prototype.getPreCode = function() {}

// Layer 상속
function BizLayer(code) {
    Layer.call(this, code);
    this.type = "biz";
    this.bindCode = "%bizUrl%";
    this.data;
    this.maxIndex = 0;
    this.preCode = "";
}
BizLayer.prototype = new Layer();
BizLayer.prototype.zindex = 1;
BizLayer.prototype.getUrl = function (code) {
    return "/component/bizFrame.html?time=" + (new Date()).getTime();
}
BizLayer.prototype.bindInSource = function (source, bindName, value) {
    source = source.replace(new RegExp("%bizCode%", 'gi'), value);
    return source.replace(new RegExp(bindName, 'gi'), "/" + value.replace(/_/g, '/') + ".html");
}
BizLayer.prototype.show = function (layer) {
    try {
        if (typeof layer.code == "string") {
            $("#" + layer.code).show();
            $("#" + layer.code).css("z-index", BizLayer.prototype.zindex++);

            $(".taskbar").css({ backgroundColor: "#008c9a", color: "#ffffff", "border-top": "0px", "border-bottom": "1px solid #000000" });
            $("#" + layer.code.replace("biz", "tbar")).css({ backgroundColor: "#364e6f", color: "#ffffff", "border-top": "1px solid #000000", "border-bottom": "0px" });
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
    if (typeof code == "string" && code != "") {
        $("#" + code).hide();
        $("#" + code.replace("biz", "tbar")).css({ backgroundColor: "#364e6f", color: "#ffffff" });
    }
}
BizLayer.prototype.getPreCode = function (code) {
    preCode = "";
    maxIndex = 0;
    $(".bizPages:visible").each(function () {
        if ($(this).css("z-index") > maxIndex) {
            maxIndex = $(this).css("z-index");
            preCode = $(this).attr("id");
        }
    })
    return preCode;
}
BizLayer.prototype.pushHtml = function (source) {
    $("#content").append(source);
}
BizLayer.prototype.setEvent = function (code) {
    $("#topHideBtn_" + code).click(function () {
        me.hideLayer(code);
    });
    $("#topCloseBtn_" + code).click(function () {
        DD("click", $(this).attr("id"));
        me.closeLayer(code);
        me.closeLayer(code.replace("biz", "tbar"), "tbar");
    });
}
BizLayer.prototype.getJQObject = function (code) {
    return $("#" + code);
}
BizLayer.prototype.destory = function (code) {
    try {
        $("#" + code).remove();
    }
    catch (e) {
        log.error("BizLayer.prototype.destory", e);
    }
    finally {
        log.debug("BizLayer.prototype.destory");
    }
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
    $("#task_title_" + code).click(function () {
        me.showLayer(code, "tbar");
        me.showLayer(code.replace("tbar", "biz"), "biz");
    });
    $("#task_close_" + code).click(function () {
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
    $(".taskbar").css({ backgroundColor: "#008c9a", color: "#ffffff", "border-top": "0px", "border-bottom": "1px solid #000000" });
    $("#" + layer.code).css({ backgroundColor: "#364e6f", color: "#ffffff", "border-top": "1px solid #000000", "border-bottom": "0px" });
}
TBarLayer.prototype.hide = function (code) {
    if (typeof code == "string" && code != "") {
        $("#" + code).css({ backgroundColor: "#364e6f", color: "#ffffff", "border-top": "0px", "border-bottom": "1px solid #000000" });
    }
}
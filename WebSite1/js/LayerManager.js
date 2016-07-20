var ajaxReturn = [];
function Layer(code) {
    this.code = code;
    this.source = "a";
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

// Layer 상속
function BizLayer(code) {
    Layer.call(this, code);
    this.type = "biz";
    this.bindCode = "%bizCode%";
    this.data;
}
BizLayer.prototype = new Layer();
BizLayer.prototype.getUrl = function (code) {
    return "/" + code.replace(/_/g, '/') + ".html?time=" + (new Date()).getTime();
}
BizLayer.prototype.show = function (layer) {
    if (typeof layer.code == "string") {
        $("#" + layer.code).show();
        $("#title").html(layer.getTitle());
        BizLayer.prototype.showingLayer = layer;
    }
}
BizLayer.prototype.hide = function (code) {
    if (typeof code == "string") {
        $("#" + code).hide();
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
BizLayer.prototype.showingLayer = {}



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
TBarLayer.prototype.show = function (code) {
}
TBarLayer.prototype.hide = function (code) {
}
TBarLayer.prototype.pushHtml = function (source) {
    $("#tbarArea").append(source);
}
TBarLayer.prototype.setEvent = function (code) {
    $("#tbar_title_" + code).click(function () {
        me.showLayer(code.replace("tbar", "biz"), "biz");
    });
    $("#tbar_close_" + code).click(function () {
        log.debug("close");
        //me.showLayer(this.id.replace("tbar", "biz"), "biz");
    });
}
TBarLayer.prototype.getJQObject = function (code) {
    return $("#" + code);
}
TBarLayer.prototype.saveLayerData = function () {
    return [];
}
TBarLayer.prototype.showingLayer = {}

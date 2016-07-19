var $ob = function () {
}
$ob.showingPage = {};
$ob.onload = function () {
    try {
        $(".bizTreeMenu").click(function () {
            var bizCode = this.id.replace("menu", "biz");
            if (pagePool.isPage(bizCode)) {
                $ob.showPage(bizCode);
            }
            else {
                $ob.createPage(bizCode);
            }

            var tbarCode = this.id.replace("menu", "tbar");
            if (pagePool.isPage(tbarCode)) {
                $ob.showPage(tbarCode);
            }
            else {
                $ob.createPage(tbarCode);
            }
        })
    }
    catch (e) {
        log.error("onload", e);
    }
    finally {
        log.debug("onload", this);
    }
}
$ob.getUrl = function (bizCode) {
    try {
        return "/" + bizCode.replace(/_/g, '/') + ".html?time=" + (new Date()).getTime();
    }
    catch (e) {
        log.error("onload", e);
    }
    finally {
        log.debug("getUrl", this);
    }

}
$ob.makePageData = function (bizCode, data) {
    try {
        return {
            type: $ob.getType(bizCode)
          , title: $ob.getTitle(bizCode)
          , bizCode: bizCode
          , content: data.replace(/%bizCode%/gi, bizCode)
          , values: []
        };
    }
    catch (e) {
        log.error("resetPageData", e);
    }
    finally {
        log.debug("resetPageData", this);
    }

}
$ob.createPage = function (bizCode) {
    try {
        if (pagePool.isPage(bizCode))
            $ob.deletePage(bizCode);

        var url = $ob.getUrl(bizCode);
        $.ajax({
            type: "GET"
            , url: url
            , data: {}
            , async: false
        }).done(function (data) {
            var newPage = $ob.makePageData(bizCode, data);
            pagePool.addPage(newPage);
            $ob.hidePage();
            $("#content").html($("#content").html() + newPage.content);
            $ob.showPage(bizCode);
        });
    }
    catch (e) {
        log.error("createPage", e);
    }
    finally {
        log.debug("createPage", this);
    }

}
var zindex = 0;
$ob.showPage = function (bizCode) {
    try {
        $ob.saveShowingPage();
        $ob.hidePage();
        $("#" + bizCode).show();
        $ob.showingPage = pagePool.getPage(bizCode);
    }
    catch (e) {
        log.error("showPage", e);
    }
    finally {
        log.debug("showPage", this);
    }
}
$ob.hidePage = function () {
    try {
        if (typeof $ob.showingPage.bizCode == "string") {
            $("#" + $ob.showingPage.bizCode).hide();
        }
    }
    catch (e) {
        log.error("hidePage", e);
    }
    finally {
        log.debug("hidePage", this);
    }
}

$ob.deletePage = function (bizCode) {
    try {
        pagePool.deletePage(bizCode);
        $("#" + bizCode).html("");
    }
    catch (e) {
        log.error("deletePage", e);
    }
    finally {
        log.debug("deletePage", this);
    }

}
$ob.saveShowingPage = function () {
    try {
        var showingPage = $ob.showingPage;
        if (typeof showingPage.bizCode != "undefined") {
            $("#contentForm").serializeArray();
            showingPage.content = $("#content").html();
            showingPage.values = $("#contentForm").serializeArray();
            pagePool.setPage(showingPage);
        }
    }
    catch (e) {
        log.error("saveShowingPage", e);
    }
    finally {
        log.debug("saveShowingPage", this);
    }


}
$ob.getType = function (bizCode) {
    try {

    }
    catch (e) {
        log.error("getType", e);
    }
    finally {
        log.debug("getType", this);
    }

    return bizCode;
}

$ob.getTitle = function (bizCode) {
    try {

    }
    catch (e) {
        log.error("getTitle", e);
    }
    finally {
        log.debug("getTitle", this);
    }

    return bizCode;
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



















var LayerPool = new function () {
    var list = [];

    this.addLayer = function (Layer) {

        this.setLayer(Layer);
        $("#taskbar").html($("#taskbar").html() + $com.taskHtml);

        $("#taskWrap").attr("id", "task_" + Layer.bizCode);
        $("#task_title").attr("id", "task_title_" + Layer.bizCode);
        $("#task_closeBtn").attr("id", "task_closeBtn_" + Layer.bizCode);

        $("#task_title_" + Layer.bizCode).html(Layer.title);
        $("#task_closeBtn_" + Layer.bizCode).click(function () {
            alert(2);
        });
        $("#task_" + Layer.bizCode).click(function () {
            var bizCode = this.id.replace("task_", "");
            alert(bizCode);
            //            $ob.showLayer(bizCode);
        });

    }
    this.setLayer = function (Layer) {
        list[Layer.bizCode.toLowerCase()] = Layer;
    }
    this.getLayer = function (name) {
        return list[name.toLowerCase()];
    }
    this.deleteLayer = function (name) {
        delete list[name.toLowerCase()];
    }
    this.setAllLayer = function (predicateFunction) {
        for (var Layer in list) {
            predicateFunction(this.getLayer(Layer));
        }
    }
    this.isLayer = function (name) {
        return !(typeof list[name.toLowerCase()] == "undefined");
    }
    this.toString = function () {
        var args = [];
        for (Layer in list) {
            args.push(Layer);
        }
        return args.join(",");
    }
    this.unittest = function () {
        //this.addLayer("aAa", "111");
        //this.setLayer("bBb", "222");
        //this.deleteLayer("AAA");
        //this.addLayer("ccc", "333");

        //if (this.toString() != "bbb,ccc")
        //    alert(this.toString());
        //if (this.isLayer("aaa"))
        //    alert("isLayer aaa error");
        //if (!this.isLayer("bbb"))
        //    alert("isLayer bbb error");

        //list = [];
    }
}
LayerPool.unittest();

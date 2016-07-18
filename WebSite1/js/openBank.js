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
$ob.resetPageData = function (bizCode, data) {
    try {
        data.replace(/%bizCode%/gi, bizCode);
        return {
            type: $ob.getType(bizCode)
          , title: $ob.getTitle(bizCode)
          , bizCode: bizCode
          , content: data
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
            var newPage = $ob.resetPageData(bizCode, data);
            pagePool.addPage(newPage);
            $("#content").html($("#content").html() + newPage.content);
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
        var page = pagePool.getPage(bizCode);
        $ob.showingPage = page;
        $(".bizPages").css("display", "hidden");
        $("#" + bizCode).css("display", "block");
    }
    catch (e) {
        log.error("onload", e);
    }
    finally {
        log.debug("showPage", this);
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
            $("#info").append("[" + this.eventCnt + "]" + msg + "<br>");
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


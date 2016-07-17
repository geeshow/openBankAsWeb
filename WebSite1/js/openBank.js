var $ob = function () {
}
$ob.showingPage = {};
$ob.onload = function () {
    $(".bizTreeMenu").click(function () {
        try {
            var bizCode = this.id.replace("menu", "biz");
            if (pagePool.isPage(bizCode)) {
                $ob.showPage(bizCode);
            }
            else {
                $ob.createPage(bizCode);
            }
        } catch (e) {
            $ob.errorMsg(e);
        }
    })
}
$ob.errorMsg = function (e) {
    $("#info").html(e);
}

$ob.getUrl = function (bizCode) {
    return "/" + bizCode.replace(/_/g, '/') + ".html?time=" + (new Date()).getTime();
}
$ob.resetPageData = function (bizCode, data) {
    // body태그 부분까지 삭제처리 하기 위한 로직
    var startIdx = data.indexOf("<", data.search(/<body/i) + 1);
    var endIdx = data.search(/<\/body/i);
    data = data.substring(startIdx, endIdx);
    
    // div태그의 contentWrap을 bizCode로 변경하여 고유 id를 가지게 함.
    return {
        type    : $ob.getType(bizCode)
      , title   : $ob.getTitle(bizCode)
      , bizCode : bizCode
      , content : data.replace("contentWrap", bizCode)
    }
}
$ob.createPage = function (bizCode) {
    if (pagePool.isPage(bizCode))
        $ob.deletePage(bizCode);

    var url = $ob.getUrl(bizCode);
    $.ajax({
         type:"GET"
        , url:url
        , data:{}
        , async:false
    }).done(function (data) {
        var newPage = $ob.resetPageData(bizCode, data);
        pagePool.addPage(bizCode, newPage);
        $ob.showPage(bizCode);
    });
}
var zindex = 0;
$ob.showPage = function (bizCode) {
    $ob.saveShowingPage();
    var page = pagePool.getPage(bizCode);
    $ob.showingPage = page;
    $("#content").html(page.content);
}
$ob.deletePage = function (bizCode) {
    pagePool.deletePage(bizCode);
    $("#"+bizCode).html("");
}
$ob.saveShowingPage = function () {
    var showingPage = $ob.showingPage;
    if (typeof showingPage.bizCode != "undefined") {
        showingPage.content = $("#content").html();
        alert($("#content").html());
        pagePool.addPage(showingPage.bizCode, showingPage);
    }
}
$ob.getType = function (bizCode) {
    return bizCode;
}

$ob.getTitle = function (bizCode) {
    return "한글화작업:" + bizCode;
}
$(document).ajaxComplete(function () {
    $("#status").text("Triggered ajaxComplete handler.");
});
$(document).ajaxError(function () {
    $("#status").text("Error.");
});


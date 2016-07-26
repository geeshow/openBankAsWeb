String.prototype.bytes = function () {
    var msg = this;
    var cnt = 0;

    //한글이면 2, 아니면 1 count 증가
    for (var i = 0; i < msg.length; i++)
        cnt += (msg.charCodeAt(i) > 128) ? 2 : 1;
    return cnt;
}

$(document).ready(function () {
    $("input[showZoom]").each(function () {
        $(this).css("width", ($(this).innerWidth() - 32) + "px");
        $(this)[$(this).attr("showZoom")]("<input class='smallBtn' type='button' id='" + $(this).attr("id") + "_ZOOM' value='@' size='5' onZoomClick='alert(this.value);' />");
        $("#" + $(this).attr("id") + "_ZOOM").attr("onZoomClick", $(this).attr("onZoomClick"));
        $("#" + $(this).attr("id") + "_ZOOM").attr("parentId", $(this).attr("id"));
        $("#" + $(this).attr("id") + "_ZOOM").one("click", function () {
            eval($(this).attr("onZoomClick"));
        });
    });
    $("input[showCalendar]").each(function () {
        $(this).css("width", ($(this).innerWidth() - 32) + "px");
        $(this)[$(this).attr("showCalendar")]("<input class='smallBtn' type='button' id='" + $(this).attr("id") + "_CAL' value='#' size='5' />");
        $("#" + $(this).attr("id") + "_CAL").attr("parentId", $(this).attr("id"));
        $("#" + $(this).attr("id") + "_CAL").one("click", function () {
            $("#" + $(this).attr("parentId")).val("2016-07-01");
        });
    });
    $("input[suffix]").each(function () {
        var size = $(this).attr("suffix").length;
        var width = size * 13;
        $(this).css("width", ($(this).innerWidth() - (width + 13)) + "px");
        $(this).css("border-right", "0px");
        $(this).after("<span class='suffix' style='width:" + (width) + "px'>" + $(this).attr("suffix") + "</span>");
    });
});

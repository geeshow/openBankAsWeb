$(document).ready(function () {
    try {
        var bizCode = location.pathname.split(".")[0].replace(/\//g, "_");
        bizCode = bizCode.substring(1, bizCode.length);
        parent.document.getElementById("biz_title_" + bizCode).innerText = " - " + document.title;
    }
    catch (e) {

    }

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
    $("input[mask]").each(function () {
        this.value = util.mask(this.value, this.getAttribute("mask"));
    });
    $("input[mask]").keyup(function (e) {
        var setMaskValue = util.mask(this.value, this.getAttribute("mask"));
        if (this.value != setMaskValue) {
            var cab = setMaskValue.length - this.value.length;
            DD("cab", cab);
            var cursorIdx = this.selectionStart;
            this.value = setMaskValue;

            // 스페이스바
            if (e.keyCode == "32") {
                cursorIdx--;
            }
                // 백스페이스
            else if (e.keyCode == '8') {
                if (cab == 1)
                    cursorIdx--;
            }

            if (cab < 0)
                cab = 0;

            this.selectionStart = cursorIdx + cab;
            this.selectionEnd = cursorIdx + cab;
        }
    });
    $("body").keydown(function (e) {
        if (e.keyCode == 116 || e.keyCode == 49) {
            var preCode = parent.BizLayer.prototype.getTopLayerCode();
            if (preCode != "") {
                parent.BizLayer.prototype.reload(preCode);
                event.cancelable = true;
                event.returnValue = false;
            }
        }
        DD(e.keyCode);
    });
});
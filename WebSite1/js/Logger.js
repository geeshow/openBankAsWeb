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
    this.debug = function () {
        if (this.mode == "debug") {
            for (var i in arguments) {
                $("#info").append("[" + this.eventCnt + "] " + arguments[i] + "<br>");
                $("#info").scrollTop($("#info").scrollTop() + 100);
            }
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

function DD() {
    var msg = "[DD]";
    for (var i in arguments) {
        msg += arguments[i] + ", ";
    }
    log.debug(msg);
}
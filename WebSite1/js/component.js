var $com = new function () {
    var url = "/component/taskInTaskbar.html";
    $.ajax({
        type: "GET"
        , url: url
        , data: {}
        , async: true
    }).done(function (taskHtml) {
        $com.taskHtml = taskHtml;
    });
}
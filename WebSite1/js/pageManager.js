var pagePool = new function () {
    var list = [];

    this.addPage = function (page) {

        this.setPage(page);
        $("#taskbar").html($("#taskbar").html() + $com.taskHtml);

        $("#taskWrap").attr("id", "task_" + page.bizCode);
        $("#task_title").attr("id", "task_title_" + page.bizCode);
        $("#task_closeBtn").attr("id", "task_closeBtn_" + page.bizCode);
        
        $("#task_title_" + page.bizCode).html(page.title);
        $("#task_closeBtn_" + page.bizCode).click(function () {
            alert(2);
        });
        $("#task_" + page.bizCode).click(function () {
            var bizCode = this.id.replace("task_", "");
            alert(bizCode);
//            $ob.showPage(bizCode);
        });

    }
    this.setPage = function (page) {
        list[page.bizCode.toLowerCase()] = page;
    }
    this.getPage = function (name) {
        return list[name.toLowerCase()];
    }
    this.deletePage = function (name) {
        delete list[name.toLowerCase()];
    }
    this.setAllPage = function (predicateFunction) {
        for (var page in list) {
            predicateFunction(this.getPage(page));
        }
    }
    this.isPage = function (name) {
        return !(typeof list[name.toLowerCase()] == "undefined");
    }
    this.toString = function () {
        var args = [];
        for (page in list) {
            args.push(page);
        }
        return args.join(",");
    }
    this.unittest = function() {
        //this.addPage("aAa", "111");
        //this.setPage("bBb", "222");
        //this.deletePage("AAA");
        //this.addPage("ccc", "333");

        //if (this.toString() != "bbb,ccc")
        //    alert(this.toString());
        //if (this.isPage("aaa"))
        //    alert("isPage aaa error");
        //if (!this.isPage("bbb"))
        //    alert("isPage bbb error");

        //list = [];
    }
}
pagePool.unittest();

var pagePool = new function () {
    var list = [];

    this.addPage = function (name, value) {
        list[name.toLowerCase()] = value;
    }
    this.setPage = function (name, value) {
        addPage(name,value);
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

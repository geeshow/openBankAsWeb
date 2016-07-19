var LayerPool = new function () {
    var list = [];

    this.addLayer = function (layer) {
        list[layer.code.toLowerCase()] = layer;
    }
    this.setLayer = function (layer) {
        list[layer.code.toLowerCase()] = layer;
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

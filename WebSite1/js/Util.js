var util = function () {
    
}
util.mask = function (value, pattern, /* option */ nineMode) {
    try {
        if (typeof value == "undefined" || value == "")
            return "";

        // 숫자타입 적용
        if (pattern.indexOf("Z") >= 0 || pattern.indexOf("9") >= 0) {
            // 소수점이 포함된 경우 소수점 전,후 값으로 재귀호출
            if (pattern.indexOf(".") >= 0) {
                var values = value.split(".");
                var pattern = pattern.split(".");
                values.push("0"); // 소수점이 없는 경우 undefined를 방지하기 위함.
                return this.mask(values[0], pattern[0], true) + "." + this.mask(values[1], pattern[1], false);
            }
            // value에는 소수점이 있으나 pattern에는 소수점 적용 안된 경우 소수점 버림
            else if (value.indexOf(".") >= 0) {
                value = value.split(".")[0];
            }

            value = value.replace(/[^0-9\-]/g, "");
            if (value == "")
                return "";

            value = parseFloat(value) + "";
            if (typeof nineMode == "undefined")
                nineMode = true;

            var arrUseDan = pattern.split("/");
            if (typeof arrUseDan[1] != "undefined") {
                pattern = arrUseDan[0];
                danDepth = arrUseDan[1];
                value = value.substring(0, value.length - danDepth);
            }

            // 숫자패턴은 역순으로 적용
            if (nineMode) {
                value = value.split("").reverse();
                pattern = pattern.split("").reverse();
            }
            // 마이너스 부호 임시 제거
            var minusSign = "";
            if (value[value.length - 1] == "-") {
                minusSign = value.pop();
            }

            // 패턴적용
            var returnValue = [];
            var valueIdx = 0;
            for ( var i in pattern ) {
                if (pattern[i] == "9") {
                    if (typeof value[valueIdx] == "undefined")
                        returnValue[i] = "0";
                    else
                        returnValue[i] = value[valueIdx++];
                }
                else if (pattern[i] == ",")
                    returnValue[i] = ",";
                else if (typeof value[valueIdx] != "undefined")
                    returnValue[i] = value[valueIdx++];
                else
                    break;
            }

            // 마지막 콤마 삭제
            if (returnValue[returnValue.length - 1] == ",")
                returnValue.pop();

            returnValue.push(minusSign);

            // 마이너스부호 적용 및 재정렬
            if (nineMode)
                return returnValue.reverse().join("");
            else
                return returnValue.join("");
        }
        // 문자타입 적용
        else {
            value = value.replace(/[^a-zA-Z0-9]/gi, "");
            pattern = pattern.toUpperCase();

            var returnValue = "";
            var blockWord = pattern.split(/[^A-Z0-9]/);
            var blockPattern = pattern.replace(/[A-Z0-9]/g, "");
            var loopIdx = 0;
            var tempWord;
            for (var i in blockWord) {
                tempWord = value.substr(loopIdx, blockWord[i].length);
                loopIdx += blockWord[i].length;

                returnValue += tempWord + blockPattern.charAt(i);
            }

            if (loopIdx < value.length) {
                returnValue += value.substr(loopIdx);
            }
            return returnValue;
        }
    }
    catch (e) {
        alert(e);
    }

}

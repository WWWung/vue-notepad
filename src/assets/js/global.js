export default {
    stringLength(str) {
        var n = 0
        for (var i = 0; i < str.length; i++) {
            //  大于255为汉字
            if (str.charCodeAt(i) > 255) {
                n += 2
            } else {
                n++
            }
        }
        return n
    }
}
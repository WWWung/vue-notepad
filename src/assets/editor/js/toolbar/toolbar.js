import $ from "../../dom/dom.js"

class Toolbar {
    constructor(editor) {
        this.editor = editor
        this.$el
    }
    init() {
        this.$el = $(`<div class="editor-toolbar"></div>`)
        this.editor.$wrap.append(this.$el)
        const tools = this.editor.options.tools.split(" ")
        const that = this
        tools.forEach(tool => {
            createEasyFuncBtn.call(that, tool)
        })
    }
}

function createEasyFuncBtn(command) {
    const $wrap = $(`<div class="toolbar-sub"></div>`)
    const $a = $(`<a href="javascript:;" class="easyFunc editor-${command}" title="${command}"></a>`)
        //  添加事件
    if (typeof events[command] === "function") {
        const that = this
        $a.on("click", function() {
            events[command](that)
        })
    }
    this.$el.append($wrap.append($a))
}

const events = {
    bold(that) {
        that.iframeDocument.execCommand("bold", false, null)
    },
    italic(that) {
        that.iframeDocument.execCommand("italic", false, null)
    },
    underline(that) {
        that.iframeDocument.execCommand("underline", false, null)
    },
    lineThrough(that) {
        that.iframeDocument.execCommand("strikeThrough", false, null)
    },
    fontSize(e, size) {
        this.iframeDocument.execCommand("fontSize", false, size)
    }
}

export default Toolbar
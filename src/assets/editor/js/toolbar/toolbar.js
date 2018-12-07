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
    const sel = this.editor.selection
    if (command === `fontSize`) {
        const options = {
            el: $wrap,
            ops: `1 2 3 4 5 6 7`,
            event(e) {
                const fontSize = $(this).val()
                execCommand(command, fontSize)
                sel.saveRange()
                sel.restoreSelection()
            }
        }
        createSelectBtn(options)
        this.$el.append($wrap)
        return
    }
    const $a = $(`<a href="javascript:;" class="easyFunc editor-${command}" title="${command}"></a>`)
        //  添加事件
    if (typeof events[command] === "function") {
        $a.on("click", function() {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active")
            } else {
                $(this).addClass("active")
            }
            // window.getSelection()
            //  直接设置没有效果，尝试加定时器之后好了，原因未知...
            //  在有拖蓝的情况下，直接execCommand有效果，没有拖蓝的时候没有效果
            //  解决方案:
            //      1. 加定时器

            execCommand(command, null)

            //      2. createEmptyRange 创建一个空(&#8203;)的拖蓝
            // sel.createEmptyRange()
            // sel.restoreSelection()
            // events[command]()

            sel.saveRange()
            sel.restoreSelection()


        })
    }
    this.$el.append($wrap.append($a))
}

function createSelectBtn(options) {
    if (!options.el) {
        return
    }
    const $el = $(options.el)
    const ops = options.ops ? options.ops.split(" ") : []
    const event = options.event || null
    const $select = $(`<select class="editor-select"></selecti>`)
    ops.forEach(op => {
        $select.append($(`<option value="${op}" class="ops">${op}</option>`))
    })
    $select.on("change", event)
    $el.append($select)
}

const events = {
    bold(that) {
        document.execCommand("bold", false, null)
    },
    italic(that) {
        document.execCommand("italic", false, null)
    },
    underline(that) {
        document.execCommand("underline", false, null)
    },
    lineThrough(that) {
        document.execCommand("strikeThrough", false, null)
    },
    fontSize(size) {
        document.execCommand("fontSize", false, size)
    }
}

function execCommand(command, param) {
    setTimeout(function() {
        document.execCommand(command, false, param)
    })
}

export default Toolbar
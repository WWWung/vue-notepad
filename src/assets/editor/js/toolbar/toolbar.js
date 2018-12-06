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
        const sel = this.editor.selection
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

            setTimeout(function() {
                events[command]()
            })

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
    fontSize(e, size) {
        document.execCommand("fontSize", false, size)
    }
}

export default Toolbar
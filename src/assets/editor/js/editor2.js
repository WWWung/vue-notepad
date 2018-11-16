import $ from "../dom/dom.js"

class Editor {
    constructor() {
        this.tools = "bold italic underline lineThrough fontSize"
        this.fontSize = "12px 14px 16px 18px 20px 24px 28px"
        this.el = null
        this.iframe = null
    }
    init(options) {
        this.tools = options.tools || this.tools
        this.fontSize = options.fontSize || this.fontSize
        this.el = document.querySelector(options.el)
        if (!this.el) {
            errHandler("元素不存在")
            return
        }
        initWrap.call(this)

        initToolBarWrap.call(this)
        parseToolsString.call(this)
        this.wrap.appendChild(this.toolbar)

        initTextarea.call(this)

        this.el.appendChild(this.wrap)
        afterAppend.call(this)
    }
    getHtmlContent() {
        return this.iframeDocument && this.iframeDocument.body.innerHTML
    }
    getTextContent() {
        return this.iframeDocument && this.iframeDocument.body.textContent
    }
}

//  元素插入后(在插入后才能获取到iframe标签下的body)
function afterAppend() {
    this.iframeDocument = this.iframe.contentWindow.document
    this.iframeDocument.body.spellcheck = false
    this.iframeDocument.body.contentEditable = true
    createStyleSheet.call(this)
    this.iframeDocument.body.addEventListener("click", hideSelectOptions)
    this.iframeDocument.execCommand("styleWithCSS", false, null)
    const that = this

    //  储存文本域丢失之前的光标对象
    this.range = null;
    //  储存iframe标签的window
    this.iframeWindow = window.frames["www-iframe"]
    this.iframeDocument.body.addEventListener("keyup", function() {
        const ses = that.iframeWindow.getSelection()
        that.last = ses.getRangeAt(0)
    })
    this.iframeDocument.body.addEventListener("mouseup", function() {
        const ses = that.iframeWindow.getSelection()
        that.last = ses.getRangeAt(0)
    })
    this.toolbar.addEventListener("click", function(e) {
        // setCursorPositoon(that)
        // console.log(e.target.className)
    })
}

//  创建样式表
function createStyleSheet() {
    const style = this.iframeDocument.createElement("style")
    this.iframeDocument.head.appendChild(style)
    const sheet = style.sheet
    sheet.addRule("::selection", "background-color:#accef7")
    sheet.addRule("body", "font-size: 12px;border: none;padding: 20px 16px;margin: 0;")
}

//  创建容器元素
function initWrap() {
    this.wrap = document.createElement("div")
    this.wrap.className = "editor-box"
}

//  创建工具栏元素
function initToolBarWrap() {
    this.toolbar = document.createElement("div")
    this.toolbar.className = "editor-toolbar"
}

//  创建文本域
function initTextarea() {
    const wrap = document.createElement("div")
    wrap.className = "textarea-wrap"
    const iframe = document.createElement("iframe")
    iframe.name = "www-iframe"
    iframe.className = "www-iframe"
        // iframe.body.contentEditable = true
    this.iframe = iframe
    wrap.appendChild(iframe)
    this.wrap.appendChild(wrap)
}

function parseToolsString() {
    var arr = this.tools.split(" ")
    arr.forEach(f => {
        var handler = toolbarHandler[f]
        typeof handler === "function" && handler.call(this)
    })
}

function createEasyFunc(command) {
    const wrap = document.createElement("div")
    wrap.className = "toolbar-sub"
    const a = document.createElement("a")
    wrap.appendChild(a)
    a.href = "javascript:;"
    a.className = "easyFunc editor-" + command
    a.title = command
        //  添加事件
    if (typeof events[command] === "function") {
        const that = this
        a.addEventListener("click", function() {
            const $this = $(this)
            if ($this.hasClass("active")) {
                $this.removeClass("active")
            } else {
                $this.addClass("active")
            }
            setCursorPositoon(that)
            events[command](that)
        })
    }
    this.toolbar.appendChild(wrap)
}

//  点击工具栏的时候重新设置光标的位置
function setCursorPositoon(that) {
    const ses = that.iframeWindow.getSelection()
    var selection = that.iframeWindow.getSelection()
    selection.removeAllRanges()
    console.log(selection.restoreSelection)
    if (that.last) {
        selection.addRange(that.last)
        that.iframeDocument.body.focus()
    }
}

//  创建工具栏的图标按钮
const toolbarHandler = {
    bold() {
        createEasyFunc.call(this, "bold")
    },
    italic() {
        createEasyFunc.call(this, "italic")
    },
    underline() {
        createEasyFunc.call(this, "underline")
    },
    lineThrough() {
        createEasyFunc.call(this, "lineThrough")
    },
    fontSize() {
        const div = document.createElement("div")
        div.id = "editor-fontSizePicker"
        div.innerHTML = "字体大小"
        const option = {
            ops: "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20px",
            title: "字体大小",
            onSelect: events.fontSize.bind(this)
        }
        const real = initSelect(div, option)

        const sub = document.createElement("div")
        sub.className = "toolbar-sub"
        sub.appendChild(real)
        this.toolbar.appendChild(sub)
    }
}

//  事件
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

const errHandler = err => {
    console.error(err)
}

//  传入dom元素和配置项初始化一个下拉控件
function initSelect(node, obj) {
    if (!node) {
        console.log("err")
        return
    }
    const text = node.textContent
    node.style.display = "none"

    const div = document.createElement("div")
    div.className = "editor-select"
    div.addEventListener("click", showSelectOptions)
    document.addEventListener("click", function(e) {
        if (e.target.className === "editor-select-text" || e.target.className === "editor-select-icon" || e.target.className === "editor-select") {
            return
        }
        hideSelectOptions()
    })

    const icon = document.createElement("span")
    icon.className = "editor-select-icon"

    const textWrap = document.createElement("span")
    textWrap.className = "editor-select-text"
    textWrap.textContent = obj.title

    div.appendChild(textWrap)
    div.appendChild(icon)

    const options = obj && obj.ops ? obj.ops.split(" ") : []
    const ul = document.createElement("ul")
    ul.className = "editor-select-options"
    options.forEach(o => {
        const li = document.createElement("li")
        li.className = "editor-select-option"
        li.innerHTML = o
        ul.appendChild(li)
        li.addEventListener("click", function(e) {
            // e.stopPropagation()
            typeof obj.onSelect === "function" && obj.onSelect(e, o)
            textWrap.textContent = o
            hideSelectOptions()
        })
    })
    div.appendChild(ul)
    return div
}

//  显示下拉框
function showSelectOptions(e) {
    // e.stopPropagation()
    const options = this.querySelector(".editor-select-options")
    if (!options || !options.style) {
        errHandler("下拉框添加事件失败:未找到选项")
    }
    options.style.display = "block"
}

//  隐藏下拉框
function hideSelectOptions() {
    window.parent.document.querySelectorAll(".editor-select-options").forEach(list => {
        if (list) {
            list.style.display = "none"
        }
    })
    document.querySelectorAll(".editor-select-options").forEach(list => {
        if (list) {
            list.style.display = "none"
        }
    })
}

export default Editor
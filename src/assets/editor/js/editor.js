/*
{
    el: selector

}

*/

//  简单的图标
const createEasyFunc = (toolbar, command) => {
    const wrap = document.createElement("div")
    wrap.className = "toolbar-sub"
    const a = document.createElement("a")
    wrap.appendChild(a)
    a.href = "javascript:;"
    a.className = "easyFunc editor-" + command
    a.title = command
        //  添加事件
    if (typeof events[command] === "function") {
        a.addEventListener("click", events[command])
    }
    toolbar.appendChild(wrap)
}

const funcs = {
    bold(toolbar) {
        createEasyFunc(toolbar, "bold")
    },
    italic(toolbar) {
        createEasyFunc(toolbar, "italic")
    },
    underline(toolbar) {
        createEasyFunc(toolbar, "underline")
    },
    lineThrough(toolbar) {
        createEasyFunc(toolbar, "lineThrough")
    },
    fontSize(toolbar) {
        var div = document.createElement("div")
        div.id = "editor-fontSizePicker"
        div.innerHTML = "字体大小"
        const div = func(fragment)
        const real = initSelect(div, "12px 14px")
        toolbar.appendChild(real)
    }
}

const events = {
    bold() {
        document.execCommand("bold", false, null)
    },
    italic() {
        document.execCommand("italic", false, null)
    },
    underline() {
        document.execCommand("underline", false, null)
    },
    lineThrough() {
        document.execCommand("strikeThrough", false, null)
    },
}

//  创建容器元素
const initWrap = () => {
    const div = document.createElement("div")
    div.className = "editor-box"
    return div
}

//  创建工具栏元素
const initToolBarWrap = () => {
    const div = document.createElement("div")
    div.className = "editor-toolbar"
    return div
}

//  创建文本域父集元素及文本域
const initTextarea = () => {
    const wrap = document.createElement("div")
    wrap.className = "textarea-wrap"
    const div = document.createElement("div")
    div.className = "textarea"
    div.contentEditable = "true"
    div.spellcheck = false
    wrap.appendChild(div)
    return wrap
}

//  解析工具栏
const parseToolsString = (string) => {
    const fragment = document.createDocumentFragment()
    var arr = string.split(" ")
    arr.forEach(f => {
        var func = funcs[f]
        typeof func === "function" && func(fragment)
    })
    return fragment
}
const initSelect = (node, ops) => {
    if (!node) {
        console.log("err")
        return
    }
    const text = node.textContent
    node.style.display = "none"

    const div = document.createElement("div")
    div.className = "editor-select"

    const icon = document.createElement("span")
    icon.className = "editor-icon"
    const textWrap = document.createElement("span")
    textWrap.textContent = text
    div.appendChild(textWrap)
    div.appendChild(icon)

    const options = ops.split(" ")
    const ul = document.createElement("ul")
    ul.className = "editor-select-options"
    let html = ``
    options.forEach(o => {
        html += `<li class="editor-select-option">${o}</li>`
    })
    ul.innerHTML = html
    div.appendChild(ul)
    console.log(div)
    return div
}

class Editor {
    constructor() {
        this.tools = "bold italic underline lineThrough fontSize"
        this.font_size = "12px 14px 16px 18px 20px 24px 28px"
    }
    init(obj) {
        document.execCommand("styleWithCSS", false, null)

        this.el = document.querySelector(obj.el)
        if (!this.el) {
            console.log("err")
            return
        }
        this.funcs = obj.tools || this.tools


        const fragment = document.createDocumentFragment()
        const wrap = initWrap()
        const toolbar = initToolBarWrap()

        const tools = parseToolsString(this.tools)
        toolbar.appendChild(tools)

        const textarea = initTextarea()

        wrap.appendChild(toolbar)
        fragment.appendChild(wrap)
        fragment.appendChild(textarea)
        this.el.appendChild(fragment)
    }
}

export default new Editor()
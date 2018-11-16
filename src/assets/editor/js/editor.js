/*
{
    el: selector

}

*/


const cursorPos = {
    start: 0,
    end: 0,
    node: null
}

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
        createEasyFunc.call(this, toolbar, "bold")
    },
    italic(toolbar) {
        createEasyFunc.call(this, toolbar, "italic")
    },
    underline(toolbar) {
        createEasyFunc.call(this, toolbar, "underline")
    },
    lineThrough(toolbar) {
        createEasyFunc.call(this, toolbar, "lineThrough")
    },
    fontSize(toolbar) {
        const div = document.createElement("div")
        div.id = "editor-fontSizePicker"
        div.innerHTML = "字体大小"
        const option = {
            ops: "1 2 3 4 5",
            title: "字体大小",
            onSelect: events.fontSize
        }
        const real = initSelect(div, option)

        const sub = document.createElement("div")
        sub.className = "toolbar-sub"
        sub.appendChild(real)
        toolbar.appendChild(sub)
    }
}

const events = {
    bold() {
        document.execCommand("bold", false, null)
            // setTextareaFocusAfterClick()
    },
    italic() {
        document.execCommand("italic", false, null)
        setTextareaFocusAfterClick()
    },
    underline() {
        document.execCommand("underline", false, null)
        setTextareaFocusAfterClick()
    },
    lineThrough() {
        document.execCommand("strikeThrough", false, null)
        setTextareaFocusAfterClick()
    },
    fontSize(e, size) {
        document.execCommand("fontSize", false, size)
    }
}

//  在点击事件触发之后保持文本域focus状态，并且不丢失被选中的文字
const setTextareaFocusAfterClick = cursorPos => {
    // var ses = window.getSelection()

    // //  当传入cursorPos对象的时候就采用对象里的值否则则获取
    // var node = cursorPos ? cursorPos.node : ses.baseNode
    // var cursorEndPos = cursorPos ? cursorPos.end : ses.focusOffset
    //     //  选区的起点(如果没有选中文本那么该值等于选中的终点)
    // var cursorStartPos = cursorPos ? cursorPos.start : ses.anchorOffset
    //     // node.setSelectionRange(cursorStartPos, cursorEndPos) setSelectionRange方法只针对input/textarea

    // //  创建一个新的选择区域
    // const range = document.createRange()
    // range.collapse(true)
    // range.setStart(node, cursorStartPos)
    // range.setEnd(node, cursorEndPos)
    //     //  给对象重新赋值
    // if (cursorPos) {
    //     cursorPos.node = node
    //     cursorPos.end = cursorEndPos
    //     cursorPos.start = cursorStartPos
    // }

    // //  创建一个新的selection对象
    // var selection = window.getSelection()
    // selection.removeAllRanges()
    // selection.addRange(range)
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
    const iframe = document.createElement("iframe")
    iframe.name = "www-iframe"
        // iframe.body.contentEditable = true
    this.iframe = iframe
    wrap.appendChild(iframe)
        // const div = document.createElement("div")
        // div.addEventListener("keyup", function() {
        //     const ses = window.getSelection()
        //     cursorPos.end = ses.focusOffset
        //     cursorPos.start = ses.anchorOffset
        //     cursorPos.node = ses.baseNode
        //     console.log(cursorPos)
        // })
        // div.addEventListener("mouseup", function() {
        //     const ses = window.getSelection()
        //     cursorPos.end = ses.focusOffset
        //     cursorPos.start = ses.anchorOffset
        //     cursorPos.node = ses.baseNode
        //     console.log(cursorPos)
        // })
        // div.className = "textarea"
        // div.contentEditable = "true"
        // div.spellcheck = false
        // wrap.appendChild(div)
    return wrap
}

const affterAppend = () => {
    const iframe = window.frames["www-iframe"]
    iframe.document.querySelector("body").contentEditable = "true"
}

//  解析工具栏
const parseToolsString = string => {
    const fragment = document.createDocumentFragment()
    var arr = string.split(" ")
    arr.forEach(f => {
        var func = funcs[f]
        typeof func === "function" && func.call(this, fragment)
    })
    return fragment
}

//  传入dom元素和配置项初始化一个下拉控件
const initSelect = (node, obj) => {
    if (!node) {
        console.log("err")
        return
    }
    const text = node.textContent
    node.style.display = "none"

    const div = document.createElement("div")
    div.className = "editor-select"
        //  在鼠标点击的时候就把焦点转换到
        // div.addEventListener("mousedown", setTextareaFocusAfterClick)
    div.addEventListener("click", showSelectOptions)
    document.addEventListener("click", hideSelectOptions)

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
            e.stopPropagation()
            typeof obj.onSelect === "function" && obj.onSelect(e, o)
            textWrap.textContent = o
            setTextareaFocusAfterClick(cursorPos)
            hideSelectOptions()
        })
    })
    div.appendChild(ul)
    return div
}

//  显示下拉框
function showSelectOptions(e) {
    e.stopPropagation()
    setTextareaFocusAfterClick(cursorPos)
    const options = this.querySelector(".editor-select-options")
    if (!options || !options.style) {
        errHandler("下拉框添加事件失败:未找到选项")
    }
    options.style.display = "block"
}

//  隐藏下拉框
function hideSelectOptions() {
    document.querySelectorAll(".editor-select-options").forEach(list => {
        if (list) {
            list.style.display = "none"
        }
    })
}

const errHandler = err => {
    console.error(err)
}

class Editor {
    constructor() {
        this.tools = "bold italic underline lineThrough fontSize"
        this.font_size = "12px 14px 16px 18px 20px 24px 28px"
        this.el = null
        this.iframe = null
    }
    init(obj) {
        // document.execCommand("styleWithCSS", false, null)

        this.el = document.querySelector(obj.el)
        if (!this.el) {
            console.log("err")
            return
        }
        this.funcs = obj.tools || this.tools


        const fragment = document.createDocumentFragment()
            //  容器
        const wrap = initWrap()
            //  工具栏
        const toolbar = initToolBarWrap()
            //  工具栏的操作项
        const tools = parseToolsString.call(this, this.tools)
        toolbar.appendChild(tools)

        const textarea = initTextarea.call(this)

        wrap.appendChild(toolbar)
        fragment.appendChild(wrap)
        fragment.appendChild(textarea)
        this.el.appendChild(fragment)
        affterAppend()
    }
    afterAppend() {

    }
}

export default Editor
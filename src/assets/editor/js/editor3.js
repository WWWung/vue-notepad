import $ from "../dom/dom.js"
import Toolbar from "./toolbar/toolbar.js"

let idCount = 1;

class Editor {
    constructor() {
        this.options = {
            tools: "bold italic underline lineThrough fontSize",
            fontSize: "12px 14px 16px 18px 20px 24px 28px"
        }
        this.$el = null
        this.$iframe = null
        this.id = ""
        this.range = null
            // this.
    }
    init(options) {
        let id = `www-editor-${idCount++}`
        this.id = id
        this.$el = $(options.el)

        initDom.call(this)

        afterAppend.call(this)
    }
    getHtmlContent() {
        return this.iframeDocument && this.iframeDocument.body.innerHTML
    }
    getTextContent() {
        return this.iframeDocument && this.iframeDocument.body.textContent
    }
}

function initDom() {
    this.$iframe = $(`<iframe id="${this.id}" name="${this.id}" class="www-iframe"></iframe>`)
    this.$wrap = $(`<div class="editor-box"></div>`)

    this.$toolbar = new Toolbar(this)
    this.$toolbar.init()

    this.$wrap.append(this.$iframe)
    this.$el.append(this.$wrap)
}

function afterAppend() {
    this.iframeDocument = this.$iframe[0].contentWindow.document
    this.iframeWindow = window.frames[this.id]
        //  可输入
    this.iframeDocument.body.contentEditable = true
        //  禁用拼写检查
    this.iframeDocument.body.spellcheck = false
        //  使用css来生成标记
    this.iframeDocument.execCommand("styleWithCSS", true, null)

    createStyleSheet.call(this)
}

//  创建样式表
function createStyleSheet() {
    const style = this.iframeDocument.createElement("style")
    this.iframeDocument.head.appendChild(style)
    const sheet = style.sheet
    sheet.addRule("::selection", "background-color:#accef7")
    sheet.addRule("body", "font-size: 12px;border: none;padding: 20px 16px;margin: 0;")
}

//  生成toolbar
function initToolbar() {
    const str = this.options.tools
    const tools = str.split(" ")
    console.log(tools)
}

export default Editor
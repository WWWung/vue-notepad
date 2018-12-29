import $ from "../dom/dom.js"
import Toolbar from "./toolbar/toolbar.js"
import Selection from "./selection/selection.js"

let idCount = 1;

class Editor {
    constructor() {
        this.options = {
            tools: "bold italic underline lineThrough fontSize foreColor link code",
            fontSize: "12px 14px 16px 18px 20px 24px 28px"
        }
        this.$el = null
        this.$iframe = null
        this.id = ""
        this.range = null
        this.selection = new Selection(this)
    }
    init(options) {
        let id = `www-editor-${idCount++}`
        this.id = id
        this.$el = $(options.el)

        initDom.call(this)
        this.initSelection(true)
            // this.selection.createRangeByElem()

        // afterAppend.call(this)
    }
    initSelection(newLine) {
        return
        const $textElem = this.$textarea
        const $children = $($textElem[0].children)
            //  回车换行问题见 http://web.jobbole.com/92919/
        if (!$children.length) {
            // 如果编辑器区域无内容，添加一个空行，重新设置选区
            $textElem.append($('<p><br></p>'))
            this.initSelection()
            return
        }

        const $last = $($children[$children.length - 1])

        if (newLine) {
            // 新增一个空行
            const html = $last.html().toLowerCase()
            const nodeName = $last[0].nodeName
            if ((html !== '<br>' && html !== '<br\/>') || nodeName !== 'P') {
                // 最后一个元素不是 <p><br></p>，添加一个空行，重新设置选区
                $textElem.append($('<p><br></p>'))
                this.initSelection()
                return
            }
        }
        this.selection.createRangeByElem($last, false, true)
        this.selection.restoreSelection()
    }
    getHtmlContent() {
        return this.iframeDocument && this.iframeDocument.body.innerHTML
    }
    getTextContent() {
        return this.iframeDocument && this.iframeDocument.body.textContent
    }
    insertHtml(html) {
        const range = this.selection.getRange()
        document.execCommand('insertHTML', false, html)
        console.log(this.queryCommandSupported('insertHTML'))
        return
        if (this.queryCommandSupported('insertHTML')) {
            // W3C
            document.execCommand('insertHTML', false, html)
        } else if (range.insertNode) {
            // IE
            range.deleteContents()
            range.insertNode($(html)[0])
        } else if (range.pasteHTML) {
            // IE <= 10
            range.pasteHTML(html)
        }
    }
}

function initDom() {
    document.execCommand("styleWithCSS", true, null)
    this.$wrap = $(`<div class="editor-box"></div>`)
    this.$textarea = $(`<div class="editor-textarea" id="${this.id}" contenteditable="true" spellcheck="false"></div>`)
    const that = this
        //  编辑器在输入或者鼠标点击的时候会保存选区信息
    this.$textarea.on("keyup mouseup", function() {
        that.selection.saveRange()
    })

    this.$toolbar = new Toolbar(this)
    this.$toolbar.init()

    this.$wrap.append(this.$textarea)
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

    const that = this
    $(this.iframeDocument.body).on("keyup", function() {
        that.selection.saveRange()
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

//  生成toolbar
function initToolbar() {
    const str = this.options.tools
    const tools = str.split(" ")
}

function insertHtml(html) {
    const editor = this.editor
    const range = editor.selection.getRange()

    if (this.queryCommandSupported('insertHTML')) {
        // W3C
        this._execCommand('insertHTML', html)
    } else if (range.insertNode) {
        // IE
        range.deleteContents()
        range.insertNode($(html)[0])
    } else if (range.pasteHTML) {
        // IE <= 10
        range.pasteHTML(html)
    }
}

export default Editor
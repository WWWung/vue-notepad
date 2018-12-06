import $ from "../../dom/dom";

class Selection {
    constructor(editor) {
        this.editor = editor
        this.range = null
    }
    saveRange(r) {
        this.selection = window.getSelection()
        if (r) {
            this.range = r
            return r
        }
        if (!this.selection.rangeCount) {
            return r || null
        }
        const range = r || this.selection.getRangeAt(0)
        const parent = this.getSelectionContainer(range)
        if (!parent.attr("contenteditable") !== "true" && !isEditorContainer.call(this, parent[0], "[contenteditable=true]")) {
            return null
        }
        this.range = range
        return range
    }
    getRange() {
        return this.range
    }
    getSelectionContainer(range) {
        const r = range || this.range
        if (!r) {
            return null
        }
        const container = r.commonAncestorContainer
        return $(container.nodeType === 1 ? container : container.parentNode)
    }
    restoreSelection(range) {
        const r = range || this.range
        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(r)
    }
    isSelectionEmpty() {
        const range = this.range
        if (range && range.startContainer) {
            if (range.startContainer === range.endContainer) {
                if (range.startOffset === range.endOffset) {
                    return true
                }
            }
        }
        return false
    }
    createEmptyRange() {
        const editor = this.editor
        let $elem

        if (!this.getRange()) {
            // 当前无 range
            return
        }
        if (!this.isSelectionEmpty()) {
            // 当前选区必须没有内容才可以
            return
        }

        try {
            // 目前只支持 webkit 内核
            const range = this.getRange()
            this.editor.insertHtml('&#8203;')
                // 修改 offset 位置
            range.setEnd(range.endContainer, range.endOffset + 1)
                // 存储
            this.saveRange(range)
                // if (UA.isWebkit()) {
                //     console.log("a")
                //         // 插入 &#8203
                //     this.editor.insertHtml('insertHTML', '&#8203;')
                //         // 修改 offset 位置
                //     range.setEnd(range.endContainer, range.endOffset + 1)
                //         // 存储
                //     this.saveRange(range)
                // }
                // else {
                //     $elem = $('<strong>&#8203;</strong>')
                //     editor.cmd.do('insertElem', $elem)
                //     this.createRangeByElem($elem, true)
                // }
        } catch (ex) {
            console.error(ex)
                // 部分情况下会报错，兼容一下
        }
    }
    createRangeByElem($elem, toStart, isContent) {
        // $elem - 经过封装的 elem
        // toStart - true 开始位置，false 结束位置
        // isContent - 是否选中Elem的内容
        if (!$elem.length) {
            return
        }

        const elem = $elem[0]
        const range = document.createRange()

        if (isContent) {
            range.selectNodeContents(elem)
        } else {
            range.selectNode(elem)
        }

        if (typeof toStart === 'boolean') {
            range.collapse(toStart)
        }

        // 存储 range
        this.saveRange(range)
    }
}

function isEditorContainer(dom, selector) {
    const els = document.querySelectorAll(selector)
    if (!els.length) {
        return null
    }
    if (dom.nodeName.toLowerCase() === "html") {
        return null
    }
    for (var i = 0; i < els.length; i++) {
        if (els[i] === dom.parentNode || els[i] === dom) {
            return els[i]
        }
    }
    return isEditorContainer.call(this, dom.parentNode, selector)
}

export default Selection
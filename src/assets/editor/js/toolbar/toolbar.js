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
                if (!sel.getRange()) {
                    return
                }
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
    if (command === `foreColor`) {
        createColorPicker.call(this, $wrap)
        this.$el.append($wrap)
        return
    }
    if (command === 'link') {
        createLink.call(this, $wrap)
        this.$el.append($wrap)
        return
    }
    if (command === 'code') {
        createCode.call(this, $wrap)
        this.$el.append($wrap)
        return
    }
    const $a = $(`<a href="javascript:;" class="easyFunc editor-${command}" title="${command}"></a>`)
        //  添加事件
    if (typeof events[command] === "function") {
        $a.on("click", function() {
            if (!sel.getRange()) {
                return
            }
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
            sel.getSelectionContainerElem()
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

function createCode($wrap) {
    const $a = $(`<a href="javascript:;" class="easyFunc editor-link" title="link"></a>`)
    const temp = `<div id='code-panel'>
                    <p>
                        <select>
                        <option value='javascript'>javaScript</option>
                        <option value='css'>CSS</option>
                        <option value='html'>HTML</option>
                        <option value='java'>Java</option>
                        <option value='json'>JSON</option>
                        <option value='go'>GO</option>
                        </select>
                    </p>
                    <p><textarea id='code-content'></textarea></p>
                    <p><button id='code-add' class='editor-button editor-button-success'>确定</button><button id='code-cancel' class='editor-button editor-button-cancel'>取消</button></p>
                </div>`
    const that = this
    $a.on('click', function(e) {
        if (!that.editor.selection.getRange()) {
            return
        }
        e.stopPropagation()
        const removeCodePanel = function() {
            $('#code-panel').remove()
            $('body').off('click', removeCodePanel)
        }
        $('body').on('click', removeCodePanel)
        $a.append(temp)
        $('#code-panel').on('click', function(e) {
            e.stopPropagation()
        })
        $('#code-add').on('click', function() {
            const v = $('#code-content').val()
            const lang = $('#code-panel select').val() || 'javascript'
            const Prism = require('prismjs')
            const loadLanguages = require('prismjs/components/')
                // loadLanguages([lang])
            console.log(loadLanguages)
            console.log(Prism)
            let html = Prism.highlight(v, Prism.languages[lang], lang)
            that.editor.selection.restoreSelection()
            html.replace(/\n/g, '<br />')
            html = `<br  /><pre class='language-${lang}' style='max-width: 100%'>${html}</pre><br  />`
            execCommand('insertHtml', html)
            that.editor.selection.restoreSelection()
            removeCodePanel()
        })
        $('#code-cancel').on('click', function() {
            removeCodePanel()
        })
    })

    $wrap.append($a)

}

function createLink($wrap) {
    const $a = $(`<a href="javascript:;" class="easyFunc editor-link" title="link"></a>`)
    const temp = `<div id='link-panel'>
                    <p><input type='text' placeholder='标题' id='link-title'></p>
                    <p><input type='text' placeholder='地址' id='link-url'></p>
                    <p><button class='editor-button editor-button-danger' id='link-del'>删除</button><button id='link-add' class='editor-button editor-button-success'>确定</button><button id='link-cancel' class='editor-button editor-button-cancel'>取消</button></p>
                </div>`
    const that = this
    $a.on('click', function(e) {
        e.stopPropagation()
        if (!that.editor.selection.getRange()) {
            return
        }
        const removeLinkPanel = function() {
            $('#link-panel').remove()
            $('body').off('click', removeLinkPanel)
        }
        $('body').on('click', removeLinkPanel)

        $a.append(temp)
        $('#link-panel').on('click', function(e) {
            e.stopPropagation()
        })
        $('#link-del').on('click', function(e) {
            const $el = that.editor.selection.getSelectionContainerElem()
            if (!$el || $el[0].nodeName.toLowerCase() !== 'a') {
                return
            }
            that.editor.selection.restoreSelection()
            execCommand('insertHtml', '&#8203;')
            that.editor.selection.restoreSelection()
            removeLinkPanel()
        })
        $('#link-add').on('click', function(e) {
            const title = $('#link-title').val()
            const url = $('#link-url').val()
            const a = `<a href=${url} title=${title}>${title}</a>`
            that.editor.selection.restoreSelection()
            execCommand('insertHtml', a)
            that.editor.selection.restoreSelection()
            removeLinkPanel()
        })
        $('#link-cancel').on('click', function(e) {
            that.editor.selection.restoreSelection()
            removeLinkPanel()
        })
        that.editor.selection.saveRange()
        that.editor.selection.restoreSelection()
    })
    $wrap.append($a)
}

function createColorPicker($wrap) {
    const $a = $(`<a href="javascript:;" class="easyFunc editor-foreColor" title="foreColor"></a>`)
    const $div = $(`<div class='color-picker-wrap'></div>`)
    const $canvas = $(`<canvas class='color-picker-canvas' width='40' height='300' title=''></canvas>`)
    const ctx = $canvas[0].getContext('2d')
    createColor(ctx)
    const $color = $(`<div class='show-color'>#ffffff</div>`)
    const sel = this.editor.selection
    $canvas.on('click', function(e) {
        const data = pickColor.call(this, e)
        $color.css("background", data.c)
        $color.text(data.c)
        execCommand("foreColor", data.c)
        sel.saveRange()
        sel.restoreSelection()
    })
    $div.append($canvas)
    $div.append($color)
    $a.append($div)
    $wrap.append($a)
    let data = null
    $a.on('click', function(e) {
        if (!sel.getRange()) {
            return
        }
        e.stopPropagation()
        $div.css("display", 'flex')
        sel.saveRange()
        sel.restoreSelection()
        $('body').on('click', hideColorPicker)
    })
}

function hideColorPicker() {
    $('.color-picker-wrap').hide()
    $('body').off('click', hideColorPicker)
}

function pickColor(e) {
    const ctx = this.getContext('2d')
    const posInfo = this.getBoundingClientRect()
    const pX = e.pageX - posInfo.left;
    const pY = e.pageY - posInfo.top;
    var imgDataA = ctx.getImageData(0, 0, this.width, this.height);
    const pxData = imgDataA.data;
    var imgdata = parseInt(pY * this.width + pX);
    var r = pxData[4 * imgdata + 0];
    var g = pxData[4 * imgdata + 1];
    var b = pxData[4 * imgdata + 2];
    var grey = 0.3 * r + 0.59 * g + 0.11 * b;
    var color = "rgb(" + r + ", " + g + ", " + b + ",)";
    var c = "#" + to16(r) + to16(g) + to16(b);
    return {
        r,
        g,
        b,
        c
    }
}

//  转换成16进制
function to16(val) {
    var v = val.toString(16);
    if (v.length == 1) {
        return "0" + v;
    } else {
        return v
    }
}

function createColor(ctx) {
    var line1 = ctx.createLinearGradient(0, 0, 0, 300);
    line1.addColorStop(0, "#d31010");
    line1.addColorStop(0.17, "#d310cc");
    line1.addColorStop(0.34, "#1027d3");
    line1.addColorStop(0.51, "#10d3be");
    line1.addColorStop(0.65, "#10d310");
    line1.addColorStop(0.79, "#d3c810");
    line1.addColorStop(1, "#d31010");
    ctx.fillStyle = line1;
    ctx.fillRect(0, 0, 40, 300);
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
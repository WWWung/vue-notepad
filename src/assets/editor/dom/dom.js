const querySelectorAll = selector => {
    const rsl = document.querySelectorAll(selector)
    if (isDomList(rsl)) {
        return rsl
    } else {
        return [rsl]
    }
}

const createElementByHtml = html => {
    const div = document.createElement("div")
    div.innerHTML = html
    return div.children
}

const isDomList = selector => {
    let rsl = false
    if (selector instanceof NodeList || selector instanceof HTMLCollection) {
        rsl = true
    }
    return rsl
}

const getStyleObj = el => {
    return el && window.getComputedStyle(el, null)
}

const getStyle = (el, css) => {
    const style = getStyleObj(el)
    return style && style[css]
}

const setStyle = (el, cssName, cssValue) => {
    el.style[cssName] = cssValue
}

class ElementMaker {
    constructor(selector) {
        if (!selector) {
            return
        }
        if (selector instanceof ElementMaker) {
            return selector
        }
        const nodeType = selector.nodeType
        let elementList = []
        if (typeof selector === "string") {
            if (selector.indexOf("<") > -1) {
                //  <div></div>
                elementList = createElementByHtml(selector)
            } else {
                //  #id .class
                elementList = querySelectorAll(selector)
            }
        } else if (nodeType === 1 || nodeType === 9)(
            elementList = [selector]
        )
        else if (isDomList(selector) || Array.isArray(selector)) {
            elementList = selector
        }
        Array.prototype.forEach.call(elementList, (el, i) => {
            this[i] = el
        })
        this.length = elementList.length
    }

    forEach(fn) {
        for (let i = 0; i < this.length; i++) {
            const el = this[i]
            if (!fn.call(el, el, i)) {
                break
            }
        }
        return this
    }

    addClass(cls) {
        return this.forEach(el => {
            const className = el.className
            if (el.className.indexOf(cls) < 0) {
                el.className += " " + cls
            }
        })
    }

    removeClass(cls) {
        return this.forEach(el => {
            const reg = new RegExp(cls)
            el.className = el.className.replace(reg, "")
        })
    }

    hasClass(cls) {
        let bool = true
            //  多个元素时，只要有一个元素不包含cls则直接返回false
        this.forEach(el => {
            if (el.className.indexOf(cls) < 0) {
                bool = false
                return bool
            }
        })
        return bool
    }

    attr(key, val) {
        if (!val) {
            return this[0] && this[0].getAttribute(key)
        } else {
            return this.forEach(el => {
                el.setAttribute(key, val)
            })
        }
    }

    on(methodType, fn) {
        const types = methodType.split(" ")
        return this.forEach(el => {
            types.forEach(type => {
                el.addEventListener(type, fn)
            })
        })
    }

    off(methodType, fn) {
        const types = methodType.split(" ")
        return this.forEach(el => {
            types.forEach(type => {
                el.removeEventListener(type, fn)
            })
        })
    }

    css(cssName, cssValue) {
        if (!cssValue) {
            if (typeof cssName === "object") {
                for (let css of Object.keys(cssName)) {
                    this.forEach(el => {
                        setStyle(el, css, cssName[css])
                    })
                }
                return this
            } else {
                return this[0] && getStyle(this[0], cssName)
            }
        }
        return this.forEach(el => {
            setStyle(el, cssName, cssValue)
        })
    }

    show() {
        return this.css("display", "block")
    }

    hide() {
        return this.css("display", "none")
    }

    append(dom) {
        const doms = $(dom)
        return this.forEach(el => {
            doms.forEach(d => {
                el.appendChild(d)
            })
        })
    }
}

function $(selector) {
    return new ElementMaker(selector)
}

export default $
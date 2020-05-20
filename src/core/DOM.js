
class DOM {
    constructor(selector) {
        this.$el =
            typeof(selector) === 'string' ?
                document.querySelector(selector) : selector
    }

    html(source) {
        if (typeof(source) === 'string') {
            this.$el.innerHTML = source
            return this
        }

        return this.$el.outerHTML.trim()
    }
    clear() {
        return this.html('')
    }
    append(node) {
        if (node instanceof DOM) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }

        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }
}

export function $(selector) {
    return new DOM(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }

    return $(el)
}

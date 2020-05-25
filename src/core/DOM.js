
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

    text(text) {
        if (typeof(text) === 'string') {
            this.$el.textContent = text
            return this
        }

        return this.$el.textContent.trim()
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

        return this
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)

        return this
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    get data() {
        return this.$el.dataset
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    findAll(selector) {
        const res = []
        this.$el.querySelectorAll(selector)
            .forEach(el => res.push($(el)))

        return res
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        })

        return this
    }

    addClass(className) {
        this.$el.classList.add(className)

        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)

        return this
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    focus() {
        this.$el.focus()

        return this
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

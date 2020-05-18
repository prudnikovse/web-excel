
export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.components = options.components || []
    }

    createRoot() {
        const $root = document.createElement('div')
        $root.classList.add('excel')

        this.components.forEach(Component => {
            const $el = document.createElement('div')
            $el.classList.add(Component.className)
            $el.innerHTML = new Component($el).toHTML()
            $root.insertAdjacentHTML('beforeend', $el)
        })
    }

    render() {
        this.$el.append(this.createRoot())
    }
}

import {$} from '@core/DOM'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
    }

    createRoot() {
        const $root = $.create('div', 'excel')

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const cmp = new Component($el)
            $el.html(cmp.toHTML())
            $root.append($el)

            return cmp
        })

        return $root
    }

    render() {
        this.$el.append(this.createRoot())

        this.components.forEach(cmp => cmp.init())
    }
}

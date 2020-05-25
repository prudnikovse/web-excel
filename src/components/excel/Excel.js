import {$} from '@core/DOM'
import {createObserver} from '../../hoc/createObserver'

export class Excel {
    constructor(selector, options) {
        this.$root = $(selector)
        this.components = options.components || []

        this.prepare()
    }

    prepare() {
    }

    createComponent() {
        const $root = $.create('div', 'excel')

        const observer = createObserver()

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const cmp = observer(new Component($el))
            $el.html(cmp.toHTML())
            $root.append($el)

            return cmp
        })

        return $root
    }

    render() {
        this.$root.append(this.createComponent())

        this.components.forEach(cmp => cmp.init())
    }

    dispose() {
        this.components.forEach(cmp => cmp.dispose())
    }
}

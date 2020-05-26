//import {$} from '@core/DOM'
import {DOMListener} from '../hoc/DOMListener'
import {$} from '@core/DOM';

export class ExcelComponent {
    constructor(options) {
        this.$root = $.create('div', options.className)
        this.$root.html(this.toHTML())
        // eslint-disable-next-line new-cap
        DOMListener(this)
    }

    createComponent() {
    }

    init() {
    }

    toHTML() {
        return ''
    }

    getDOM() {
        return this.$root
    }

    dispose() {
        this.disposeDOMListener()
    }
}

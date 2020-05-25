//import {$} from '@core/DOM'
import {DOMListener} from '../hoc/DOMListener'

export class ExcelComponent {
    constructor($root) {
        this.$root = $root
        // eslint-disable-next-line new-cap
        DOMListener(this)
    }

    toHTML() {
        return ''
    }

    init() {
        // const domListener = createDOMListener()
        // domListener(this)

        //this.addListeners()
    }

    dispose() {
        this.disposeDOMListener()
    }
}

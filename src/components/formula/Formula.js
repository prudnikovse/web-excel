import {$} from '@core/DOM'
import {ExcelComponent} from '@core/ExcelComponent'
import {Event} from '@core/consts'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor(options) {
        super({
            name: 'Formula',
            ...options
        })

        this.$on(Event.INPUT)
            .$on(Event.KEYDOWN)
    }

    createComponent() {
    }

    init() {
        super.init()

        const $formula = this.$root.find('#formula')

        this.$subscribe('cell:select', $cell => $formula.text($cell.text()))
        this.$subscribe('cell:input', $cell => $formula.text($cell.text()))
    }

    onInput(event) {
        this.$notify('formula:input', $(event.target).text())
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()

            this.$notify('formula:done')
        }
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="formula" class="input" contenteditable="true" 
                spellcheck="false"></div>`
    }
}

import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {Event} from '@core/consts'
import {resizeHandler} from './table.resize'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: [Event.MOUSEDOWN]
        });
    }

    // onClick() {
    //     console.log('onClick')
    // }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            resizeHandler(this.$root, event)
        }
    }

    // onMouseup() {
    //     console.log('onMouseup')
    // }
    //
    // onMousemove() {
    //     console.log('onMousemove')
    // }

    toHTML() {
        return createTable()
    }
}

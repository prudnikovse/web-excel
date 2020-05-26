import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {Event} from '@core/consts'
import {resizeHandler} from './table.handlers'
import {TableSelection} from './TableSelection'
import {$} from '@core/DOM'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor(options) {
        super({
            name: 'Table',
            ...options
        })

        this.$on(Event.MOUSEDOWN)
            .$on(Event.KEYDOWN)
            .$on(Event.INPUT)
    }

    createComponent() {
    }

    init() {
        super.init()

        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection = new TableSelection()
        this.setSelection($cell)

        this.$subscribe('formula:input', text => {
            this.selection.current.text(text)
        })

        this.$subscribe('formula:done', () => {
            this.selection.current.focus()
        })
    }

    setSelection($cell) {
        this.selection.select($cell)
        this.$notify('cell:select', $cell)
    }

    changeCellText(text) {
        this.selection.current.text(text)
    }

    onInput(event) {
        this.$notify('cell:input', $(event.target))
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            resizeHandler(this.$root, event)
        } else if (event.target.dataset.type === 'cell') {
            const $target = $(event.target)
            if (event.shiftKey) {
                const target = $target.id(true)
                const current = this.selection.current.id(true)

                const cols = range(current.col, target.col)
                const rows = range(current.row, target.row)

                const ids = cols.reduce((acc, col) => {
                    rows.forEach(row => acc.push(`${row}:${col}`))
                    return acc
                }, [])

                const $cells = ids
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.setSelection($(event.target))
            }
        }
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft',
            'ArrowRight', 'ArrowDown', 'ArrowUp']

        const {key} = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.setSelection($next)
        }
    }

    // onMousemove() {
    //     console.log('onMousemove')
    // }

    toHTML() {
        return createTable()
    }
}

function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)
}

function nextSelector(key, {col, row}) {
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            col = col - 1 < 0 ? 0 : --col
            break
        case 'ArrowUp':
            row = row - 1 < 0 ? 0 : --row
            break
    }

    return `[data-id="${row}:${col}"]`
}

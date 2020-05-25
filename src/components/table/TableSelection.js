export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clearSelection()
        this.group.push($el)
        this.current = $el
        $el.addClass(TableSelection.className)
            .focus()
    }

    clearSelection() {
        this.group.forEach(sel => sel.removeClass(TableSelection.className))
        this.group = []
    }

    selectGroup($group = []) {
        this.clearSelection()

        this.group = $group

        this.group.forEach($el => $el.addClass(TableSelection.className))
    }
}

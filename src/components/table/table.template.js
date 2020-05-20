const CODES = {
    A: 65,
    Z: 90
}

function createRow(content, rowInfo) {
    return `
        <div class="row">
            <div class="row-info">${rowInfo || ''}</div>
            <div class="row-data">
                ${content}
            </div>
        </div>`
}

function createColumn(content) {
    return `
        <div class="column">${content}</div>`
}

function createCell(content = '') {
    return `
        <div class="cell" contenteditable>${content}</div>`
}

export function createTable(rowsCount = 15) {
    const rows = []

    const columns = new Array(21).fill('')
        .map((_, index) => createColumn(String.fromCharCode(CODES.A + index)))
        .join('')

    const cells = new Array(21).fill('')
        .map(createCell)
        .join('')

    rows.push(createRow(columns))

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(cells, i + 1))
    }

    return rows.join('')
}

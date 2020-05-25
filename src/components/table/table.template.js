const CODES = {
    A: 65,
    Z: 90
}

function createRow(content, rowInfo) {
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${rowInfo || ''}
                ${rowInfo ? '<div class="row-resize" ' +
        '       data-resize="row"></div>' : ''}
            </div>
            <div class="row-data">
                ${content}
            </div>
        </div>`
}

function createColumn(content, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>`
}

function createCell(row) {
    return function createCell(_, col) {
        return `
        <div class="cell" 
             data-col="${col}" 
             data-id="${row}:${col}" 
             data-type="cell"
            contenteditable>
        </div>`
    }
}

export function createTable(rowsCount = 15) {
    const rows = []

    const columns = new Array(21).fill('')
        .map((_, index) =>
            createColumn(String.fromCharCode(CODES.A + index), index))
        .join('')

    // const cells = new Array(21).fill('')
    //     .map(createCell)
    //     .join('')

    rows.push(createRow(columns))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(21).fill('')
            .map(createCell(i))
            .join('')

        rows.push(createRow(cells, i + 1))
    }

    return rows.join('')
}

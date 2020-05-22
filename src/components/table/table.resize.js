import {$} from '@core/DOM';

export function resizeHandler($root, event) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    let value

    $resizer.css({
        opacity: 1,
        [type === 'col' ?
            'bottom' : 'right']: '-5000px'
    })
    document.onmousemove = e => {
        switch (type) {
            case 'col':
                const deltaX = e.pageX - coords.right
                value = coords.width + deltaX
                $resizer.css({right: -deltaX + 'px'})
                // $parent.css({width: newWidth + 'px'})
                // cells.forEach(el =>
                //     el.css({width: newWidth + 'px'}))
                break
            case 'row':
                const deltaY = e.pageY - coords.bottom
                value = coords.height + deltaY
                $resizer.css({bottom: -deltaY + 'px'})
                //$parent.css({height: newHeight + 'px'})
                break
        }
    }

    document.onmouseup = e => {
        switch ($resizer.data.resize) {
            case 'col':
                const cells = $root
                    .findAll(`[data-col="${$parent.data.col}"]`)
                $parent.css({width: value + 'px'})
                cells.forEach(el =>
                    el.css({width: value + 'px'}))
                break
            case 'row':
                $parent.css({height: value + 'px'})
                break
        }

        document.onmousemove = null
        document.onmouseup = null
        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        })
    }
}

import {$} from '@core/DOM'
import {createObserver} from '../../hoc/createObserver'
import {Header} from '../header/Header'
import {Toolbar} from '../toolbar/Toolbar'
import {Formula} from '../formula/Formula'
import {Table} from '../table/Table'

export class Excel {
    constructor(selector, options) {
        this.$root = $(selector)
        this.components = [Header, Toolbar, Formula, Table]

        this.prepare()
    }

    prepare() {
    }

    createComponent() {
        const $root = $.create('div', 'excel')

        const observer = createObserver()

        this.components = this.components.map(Component => {
            const cmp = observer(new Component({
                className: Component.className
            }))
            cmp.init()
            $root.append(cmp.getDOM())

            return cmp
        })

        return $root
    }

    render() {
        this.$root.append(this.createComponent())
    }

    dispose() {
        this.components.forEach(cmp => cmp.dispose())
    }
}

import {capitalize} from '@core/utils'

export class DOMListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root prodided for DOMListener')
        }
        this.$root = $root
        this.listeners = listeners

        this.initListeners(listeners)
    }

    initListeners(listeners) {
        this.listeners.forEach(listener => {
            const method = getHandlerMethodName(listener)
            if (this[method]) {
                this[method] = this[method].bind(this)
                this.$root.on(listener, this[method])
            }
        })
    }

    removeListeners() {
        this.listeners.forEach(listener => {
            const method = getHandlerMethodName(listener)
            if (this[method])
                this.$root.off(listener, this[method])
        })
        this.listeners = []
    }
}

function getHandlerMethodName(eventName) {
    return `on${capitalize(eventName)}`
}


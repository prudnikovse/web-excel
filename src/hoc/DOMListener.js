import {capitalize} from '@core/utils'

function createDOMListener() {
    return function(component) {
        component.listeners = new Map()

        component.$on = (event, callback) => {
            if (!callback) {
                const name = getHandlerMethodName(event)
                callback = component[name].bind(component)||
                    new Error(`Для компонента не определен метод обработки 
                    события ${event}`)
            }

            component.listeners.set(event, callback)
            component.$root.on(event, callback)

            return component
        }

        component.$off = event => {
            if (component.listeners.has(event)) {
                component.$root.off(event, component.listeners.get(event))
            }
            return component
        }

        component.disposeDOMListener = () => {
            component.listeners.forEach((val, key) => {
                component.$root.off(key, val)
            })
        }

        return component
    }
}

function getHandlerMethodName(eventName) {
    return `on${capitalize(eventName)}`
}

export const DOMListener = createDOMListener()


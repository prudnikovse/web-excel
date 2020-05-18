
export class DOMListener {
    constructor($root) {
        if (!$root) {
            throw new Error('No $root prodided for DOMListener')
        }
        this.$root = $root
    }
}

export function capitalize(source) {
    if (typeof(source) !== 'string') {
        return ''
    }

    return source.charAt(0).toUpperCase() + source.slice(1)
}

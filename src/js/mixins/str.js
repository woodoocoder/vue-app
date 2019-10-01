
export default {
    filters: {
        truncate(value, limit) {
            if (value.length > limit) {
                value = value.substring(0, (limit - 3)) + '...';
            }
        
            return value
        },
        capitalize(value) {
            if (!value) return ''

            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
}

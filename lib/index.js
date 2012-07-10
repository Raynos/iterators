module.exports = {
    createReturnValue: createReturnValue
}

function createReturnValue(list) {
    if (Array.isArray(list)) {
        return []
    }
    return {}
}
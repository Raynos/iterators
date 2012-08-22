module.exports = forEach

function forEach(list, iterator, context, accumulator, callback) {
    var keys = Object.keys(list)
        , len = keys.length
        , count = keys.length

    if (arguments.length === 3) {
        callback = context
        context = this
        accumulator = list[len - 1]
        keys.pop()
        count--
    } else if (arguments.length === 4) {
        callback = accumulator
        accumulator = context
        context = this
    }

    go()

    function go() {
        var key = keys.pop()
            , value = list[key]

        invokeIterator(iterator, next, context, accumulator, value, key, list)
    }

    function next(err, value) {
        if (err) {
            return callback && callback(err)
        }

        accumulator = value

        if (--count === 0) {
            callback && callback(null, accumulator)
        } else {
            go()
        }
    }
}

function invokeIterator(iterator, done, context, acc, value, key, list) {
    var length = iterator.length

    if (length === 1) {
        iterator.call(context, done)
    } else if (length === 2) {
        iterator.call(context, acc, done)
    } else if (length === 3) {
        iterator.call(context, acc, value, done)
    } else if (length === 4) {
        iterator.call(context, acc, value, key, done)
    } else {
        iterator.call(context, acc, value, key, list, done)
    }
}
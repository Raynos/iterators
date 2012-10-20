var extend = require("xtend")
    , toArray = require("to-array")
    , forEach = require("./lib/sync/forEach")
    , methods = {
        // sync
        forEach: forEach
        , filter: require("./lib/sync/filter")
        , map: require("./lib/sync/map")
        , reduce: require("./lib/sync/reduce")
        , reduceRight: require("./lib/sync/reduceRight")
        , every: require("./lib/sync/every")
        , some: require("./lib/sync/some")
        // async
        , forEachAsync: require("./lib/async/forEach")
        , filterAsync: require("./lib/async/filter")
        , mapAsync: require("./lib/async/map")
        , reduceAsync: require("./lib/async/reduce")
        , reduceRightAsync: require("./lib/async/reduceRight")
        , everyAsync: require("./lib/async/every")
        , someAsync: require("./lib/async/some")
    }

extend(iterators, methods)

module.exports = iterators

function iterators(value) {
    if (!value) {
        return value
    }

    var wrapped = {}

    forEach(methods, function (func, name) {
        wrapped[name] = function () {
            var args = toArray(arguments)
            args.unshift(value)
            return iterators(func.apply(null, args))
        }
    })

    wrapped.value = value

    return wrapped
}

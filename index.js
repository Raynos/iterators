module.exports = {
    // sync
    mapSync: require("./lib/sync/map")
    , filterSync: require("./lib/sync/filter")
    , reduceSync: require("./lib/sync/reduce")
    , everySync: require("./lib/sync/every")
    , someSync: require("./lib/sync/some")
    , forEachSync: require("./lib/sync/forEach")
    , reduceRightSync: require("./lib/sync/reduceRight")
    // async
    , forEach: require("./lib/async/forEach")
}
// iterators.reduceRightSync

//iterators.map = require("./lib/async/map")
//iterators.filter = require("./lib/async/filter")
//iterators.reduce = require("./lib/async/reduce")
// iterators.forEach
// iterators.every
// iterators.some
// iterators.reduceRight
var test = require("testling")
    , sinon = require("sinon")
    , filter = require("../..").filterSync

test("filter calls each iterator", function (t) {
    var item = createItem()
        , iterator = sinon.spy(function (v) {
            return v === "b1"
        })

    var result = filter(item, iterator)

    t.ok(iterator.calledThrice, "iterator is not called three times")
    t.deepEqual(iterator.args[0], ["a1", "a", item],
        "iterator called with wrong arguments")
    t.deepEqual(iterator.args[1], ["b1", "b", item],
        "iterator called with wrong arguments")
    t.deepEqual(iterator.args[2], ["c1", "c", item],
        "iterator called with wrong argument")
    t.deepEqual(result, { "b": "b1"}, "result is incorrect")
    t.notEqual(result, item, "result is incorrect")

    t.end()
})

function createItem() {
    return {
        "a": "a1"
        , "b": "b1"
        , "c": "c1"
    }
}
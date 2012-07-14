var test = require("testling")
    , sinon = require("sinon")
    , forEach = require("../..").forEach
    , createItem = require("..").createItem

test("forEach calls each iterator", function (t) {
    var item = createItem()
        , spy = sinon.spy()
        , iterator = function (value, callback) {
            spy.apply(this, arguments)
            callback()
        }
        , done = sinon.spy()

    forEach(item, iterator, done)

    console.error("done", done.callCount)

    t.ok(spy.calledThrice, "iterator is not called three times")
    t.ok(spy.getCall(0).calledWith("a1", sinon.match.func),
        "iterator called with wrong arguments")
    t.ok(spy.getCall(1).calledWith("b1", sinon.match.func),
        "iterator called with wrong arguments")
    t.ok(spy.getCall(2).calledWith("c1", sinon.match.func),
        "iterator called with wrong argument")
    t.ok(done.calledOnce, "done was not called")
    t.deepEqual(done.args[0], [null], "done not called correctly")

    t.end()
})

test("forEach calls iterator with correct this value", function (t) {
    var item = createItem()
        , iterator = sinon.spy()
        , thisValue = {}
        , done = sinon.spy()

    forEach(item, iterator, thisValue, done)

    t.ok(iterator.calledOn(thisValue), "this value is incorrect")

    t.end()
})
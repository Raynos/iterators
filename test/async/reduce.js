var test = require("testling")
    , sinon = require("sinon")
    , reduce = require("../..").reduce
    , createItem = require("..").createItem

test("reduce calls each iterator", function (t) {
    var item = createItem()
        , spy = sinon.spy()
        , iterator = function (acc, value, callback) {
            var v = acc + value
            spy.apply(this, arguments)
            callback(null, v)
        }
        , done = sinon.spy()

    reduce(item, iterator, "", done)

    t.ok(spy.calledThrice, "iterator is not called three times")
    t.ok(spy.getCall(0).calledWith("", "a1", sinon.match.func)
        , "iterator called with wrong arguments")
    t.ok(spy.getCall(1).calledWith("a1", "b1", sinon.match.func)
        , "iterator called with wrong arguments")
    t.ok(spy.getCall(2).calledWith("a1b1", "c1", sinon.match.func)
        , "iterator called with wrong argument")
    t.ok(done.calledOnce, "done was not called")
    t.deepEqual(done.args[0], [null, "a1b1c1"], "done not called correctly")

    t.end()
})

test("reduce calls iterator with correct this value", function (t) {
    var item = createItem()
        , iterator = sinon.spy()
        , thisValue = {}
        , done = sinon.spy()

    reduce(item, iterator, thisValue, {}, done)

    t.ok(iterator.calledOn(thisValue), "this value is incorrect")

    t.end()
})

test("calls iterator with the callback last", function (t) {
    var item = createItem()
        , spy = sinon.spy()
        , iterator = function (value, index, list, callback) {
            spy.apply(this, arguments)
            callback()
        }
        , done = sinon.spy()

    reduce(item, iterator, {}, done)

    t.ok(spy.calledThrice, "iterator was not called thrice")

    t.end()
})

test("reduce reduces with first value if no initialValue", function (t) {
    var list = [1, 2]
        , spy = sinon.spy()
        , iterator = function (sum, v, callback) {
            spy.apply(this, arguments)
            callback(null, sum + v)
        }
        , done = sinon.spy()

    reduce(list, iterator, done)

    t.deepEqual(done.args[0], [null, 3], "result is incorrect")

    t.end()
})

test("returns error appropiately", function (t) {
    var item = createItem()
        , errorValue = {}
        , iterator = function(callback) {
            callback(errorValue)
        }
        , done = sinon.spy()

    reduce(item, iterator, done)

    t.equal(done.args[0][0], errorValue, "this value is incorrect")

    t.end()
})
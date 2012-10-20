var iterators = require("..")

console.log("item", iterators({ one: "one", two: "two" })
    .map(function (value) {
        return value + value
    })
    .reduce(function (acc, value) {
        return acc + value
    }, "")
    .value)

console.log("item", iterators([ "one", "two", "three" ])
    .map(function (value) {
        return value + value
    })
    .some(function (value) {
        if (value === "twotwo") {
            return value
        }
    })
    .value)

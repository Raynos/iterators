# Iterators [![build status][1]][2]

Iterate over collections in sync or async

## Example

    var iterators = require("iterators")
        , map = iterators.map
        , fs = require("fs")
        , readFile = fs.readFile

    map({
        "foo": "test/foo.js"
        , "bar": "test/bar.js"
    }, readFile, function (err, files) {
        // files.foo, files.bar
    })

## Installation

`npm install composite`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced
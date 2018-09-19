function Future (fn) {
  var callback = null
  this.then = function (cb) {
    callback = cb
  }

  function resolve (value) {
    callback(value)
  }

  fn(resolve)
}

function doSomething () {
  return new Future (function (resolve) {
    var value = 42
    console.log(value)
  })
}

console.log(doSomething().then())
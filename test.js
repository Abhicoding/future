function Future (fn) {
  var callback = null

  this.then = (cb) => {
    callback = cb
  }

  function resolve (value) {
    // callback(value)
  }
  fn (resolve)
}

function doSomething(value) {
  return new Future (function (resolve) {
    resolve(value)
  })
}

console.log(doSomething(21))
// .then((data) => console.log(data))
// then is a function which takes a function
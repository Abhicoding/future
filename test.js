function Future (fn) {
  this.then = (cb) => cb()

  function resolve (callback) {
  }
}

function doSomething(value) {
  return new Future (function () {
    console.log(value)
  })  
}

doSomething(42).then()

// then is a function which takes a function
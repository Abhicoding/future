function Future (fn) {
  var state = 'pending'
  var deferred
  var value
  
  this.then = function (onResolved, onRejected) {
    return new Future (function (resolve, reject) {
      handle({
        onResolved, onRejected, resolve, reject
      })
    })
  }

  function resolve (newValue) {
    if (newValue && typeof newValue.then === 'function') {
      newValue.then(resolve, reject)
      return
    }

    state = 'resolved'
    value = newValue
    // setTimeout(() => {
    //   callback(value)
    // })
    // if (deferred) {
    //   handle(deferred)
    // }
  }

  function reject (reason) {
    state = 'rejected'
    value = reason
    return
  }

  function handle (handler) {
    // if (state === 'pending') {
    //   deferred = onResolved
    //   return
    // }

    var handlerCallback

    if (state === 'resolved') { // post resolution
      handlerCallback = handler.onResolved
    } else {
      handlerCallback = handler.onRejected
    }

    if (!handler.onResolved) { // optional callback
      if (state === 'resolved') {
        handler.resolve(value)
      } else {
        handler.reject(value)
      }
      return
    }

    var ret = handlerCallback(value) //this returns a promise
    return handler.resolve(ret)
  }

  fn (resolve, reject)
}

function doSomething (value) {
  var newValue = 2 * value
  return new Future (function (resolve) {
    resolve(newValue)
  })
}

doSomething(21)
  .then(x => {
    console.log(2*x++)
  return 2 * x++})
  .then(x => {
    console.log(2*x--)
    return 2 * x--
  })
  .then(x => {
    console.log(x/2)
  })
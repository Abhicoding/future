function Future (fn) {
  var status = 'pending'
  var defer = null
  var value

  this.then = function (cbResolve, cbReject) {
    return new Future (function (resolve, reject) {
      handle({
        cbResolve,
        resolve,
        cbReject,
        reject
      })
    })
  }

  function resolve (input) {
    try {
      if(input && input.then === 'function'){
        input.then(resolve)
        return
      }
      status = 'resolved'
      value = input
    } catch (e) {
      reject(e)
    }
    if (defer) {
      handle(defer)
      return
    }
  }

  function reject (reason) {
      status = 'rejected'
      value = reason
    if (defer) {
      handle(defer)
    }
  }

  function handle (handler) {
    if(status === 'pending') {
      defer = handler;
      return;
    }
    setTimeout (() =>{
      var handleCallback
      
      if (status === 'resolved') {
        handleCallback = handler.cbResolve
      } else {
        handleCallback = handler.cbReject
      }

      if (!handleCallback) {
        if (status === 'resolved') {
            handler.resolve(value);
        } else {
            handler.reject(value);
        }
        return;
      }
      var returnValue
      
      try {
        returnValue = handleCallback(value)
        handler.resolve(returnValue)
      } catch (e) {
        handler.reject(e)
      }
    }, 0)
  }

  fn (resolve, reject)
}

module.exports = Future
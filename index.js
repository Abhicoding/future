function Future (fn) {
  var status = 'pending'
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
  }

  function reject (reason) {
    status = 'rejected'
    value = reason
  }

  function handle (handler) {
    // console.log(handler)

    var handleCallback
    
    if (status === 'resolved') {
      handleCallback = handler.cbResolve
    } else {
      handleCallback = handle.cbReject
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
      returnValue = handler.cbResolve(value)
      handler.resolve(returnValue)
    } catch (e) {
      handler.reject(e)
    }
  }

  fn (resolve, reject)
}

function doSomething (value) {
  var newValue = 2 * value
  return new Future (function (resolve) {
    resolve(newValue)
  })
}

// doSomething(21)
//  .then(x => {
//     x = (x+1) * 2
//     console.log(x)
//     return x
//   })
//   .then(x => {
//     x = (x+1) * 2
//     console.log(x)
//   return x})
//   .then(x => {
//     console.log(2*x--)
//     return 2 * x--
//   })
//   .then(x => {
//     console.log(x/2)
//   })

function getSomeJson() {
  return new Future(function(resolve, reject) {
    var badJson = "<div>uh oh, this is not JSON at all!</div>";
    resolve(badJson);
  });
}

// getSomeJson().then(function(json) {
//   var obj = JSON.parse(json);
//   console.log(obj);
// }, function(error) {
//   console.log('uh oh', error);
// });

getSomeJson()
  .then(function(json) {
    var obj = JSON.parse(json)
    console.log(obj)})
  .then(null, function(error) {
    console.log("an error occured: ", error)})
// var badJson = "<div>uh oh, this is not JSON at all!</div>"
// try {
//   JSON.parse(badJson)
// } catch (e) {
//   console.log('Hurr Durr. Bad JSON', e.name)
// }
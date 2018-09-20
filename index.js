function Future (fn) {
  var status = 'pending'
  var value

  this.then = function (cbResolve) {
    return new Future (function (resolve) {
      handle({
        cbResolve,
        resolve
      })
    })
  }

  function resolve (input) {
    if(input && input.then === 'function'){
      input.then(resolve)
      return
    }
    status = 'resolved'
    value = input
  }

  function handle (handler) {

    if (!handler.cbResolve) {
      handler.resolve(value)
      return
    }

    var returnValue = handler.cbResolve(value)
    return handler.resolve(returnValue)
  }

  fn (resolve)
}

function doSomething (value) {
  var newValue = 2 * value
  return new Future (function (resolve) {
    resolve(newValue)
  })
}

doSomething(21)
 .then(x => {
    x = (x+1) * 2
    console.log(x)
    return x
  })
  .then(x => {
    x = (x+1) * 2
    console.log(x)
  return x})
//   .then(x => {
//     console.log(2*x--)
//     return 2 * x--
//   })
//   .then(x => {
//     console.log(x/2)
//   })

  // function getSomeJson () {
  //   return new Promise (function (resolve, reject){
  //     var badJson = "<div> uh oh, this is not JSON at all </div>"
  //     resolve(badJson)
  //   })
  // }

  // getSomeJson()
  //   .then(function badJsonCb(json){
  //     var obj = JSON.parse(json)
  //     console.log(json)
  //   }, function badJsonErr  (error) {
  //     console.log('uh oh', error)
  //   })
var Future = require('../index.js')
var myParser = require('./json_parser').parse
var fs = require('fs')
var path = require('path')

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

var badJson = "<div>uh oh, this is not JSON at all!</div>";

function getSomeJson(input) {
  return new Future(function(resolve, reject) {
    resolve(input);
  });
}

// getSomeJson(badJson)
//   .then(function(json) {
//     var obj = JSON.parse(json)
//     console.log(obj)})
//   .then(function(data){
//     console.log("PARSED SUCCESSFULLY", data)
//   })
//   .then(null, function(error) {
//     console.log("Oh no! an error occured: ", error)})

// function getProperJson (filename) {
//   return new Future(function (resolve, reject) {
//     fs.readFile (filename, 'utf8', (error, data) => {
//       if (error) console.log(error)
//       else resolve(data)
//     })
//   })
// }

// var file = path.resolve(__dirname, './JSONfile1.json')

// getProperJson(file)
//   .then(function(json) {
//     var obj = myParser(json)
//     return obj
//   })
//   .then(function(data) {
//     console.log("THIS IS WHAT A PROPER JSON LOOKS LIKE \n", data)})
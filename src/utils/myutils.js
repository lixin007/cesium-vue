const Point = (function () {
  let c = 0;
  class Point {
    constructor (x, y) {
      this.x =x;
      this.y =y;
    }

    toString () {
      return `( ${this.x}, ${this.y} )`
    }
    showValue () {
      console.log(this.y)
    }
    showC() {
      // var test = function () {
      //   var arr = []
      //   for(var i = 0; i < 5; i++){
      //     arr.push(function () {
      //       return i*i
      //     })
      //   }
      //   return arr
      // }
      var test = function () {
        var arr = []
        for(var i = 0; i < 5; i++){
          arr.push(function (n) {
            return function () {
              return n * n
            }
          }(i))
        }
        return arr
      }

      var test1 = test()
      console.log(test1[0]())
      console.log(test1[1]())
      console.log(test1[2]())
    }
    toValue () {
      return this.x+this.y;
    }
  }
  return Point
})()


export {Point}


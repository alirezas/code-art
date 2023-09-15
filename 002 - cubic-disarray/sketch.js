var canvas = document.querySelector("canvas")
var context = canvas.getContext("2d")

var size = 320
var dpr = window.devicePixelRatio
canvas.width = size * dpr
canvas.height = size * dpr
context.scale(dpr, dpr)
context.lineWidth = 2

var squareSize = 32
var randomDisplacement = 10
var randomMultiplier = 15
var offset = 10

function draw(width, height) {
  context.beginPath()
  context.rect(-width / 2, -height / 2, width, height)
  context.stroke()
}

for (var i = squareSize; i <= size - squareSize; i += squareSize) {
  for (var j = squareSize; j <= size - squareSize; j += squareSize) {
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1
    var rotateAmt =
      (((j / size) * Math.PI) / 180) *
      plusOrMinus *
      Math.random() *
      randomMultiplier

    var plusOrMinus = Math.random() < 0.5 ? -1 : 1
    var translateAmt =
      (j / size) * plusOrMinus * Math.random() * randomDisplacement

    context.save()
    context.translate(i, j)
    context.rotate(rotateAmt)
    draw(squareSize, squareSize)
    context.restore()
  }
}

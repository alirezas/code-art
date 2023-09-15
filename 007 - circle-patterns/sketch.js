const canvasSketch = require("canvas-sketch")
const p5 = require("p5")

new p5()

const settings = {
  p5: true,
  dimensions: [1080, 1080],
}

const sketch = () => {
  dia = 100
  offset = 120

  strokeCap(CORNER)
  stroke("#5b5b5b")
  background("#ece2e1")
  var columns = int(width / (dia * 2 + offset) + offset)
  var rows = int(height / (dia * 2 + offset) + offset)
  for (var l = 0; l < columns; l++) {
    for (var d = 0; d < rows; d++) {
      resetMatrix()
      translate(
        (l + 1) * offset + dia * l + dia * (l + 1),
        (d + 1) * offset + dia * d + dia * (d + 1)
      )
      var rn = int(random(10, 30))
      for (var a = 0; a < 360; a += 30) {
        push()
        rotate(radians(a))
        for (var r = 0; r < 180; r += rn) {
          line(
            Math.sin(radians(r)) * dia,
            Math.cos(radians(r)) * dia,
            Math.sin(radians(-r)) * dia,
            Math.cos(radians(-r)) * dia
          )
        }
        pop()
      }
      noFill()
      stroke("#5b5b5b")
      ellipse(0, 0, dia * 2, dia * 2)
    }
  }

  return ({ context, width, height }) => {}
}

canvasSketch(sketch, settings)

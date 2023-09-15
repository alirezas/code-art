const canvasSketch = require("canvas-sketch")
const p5 = require("p5")

new p5()

const settings = {
  p5: true,
  dimensions: [900, 900],
}

const sketch = () => {
  background(0, 0, 10)
  angleMode(DEGREES)
  const layers = 80
  const step = 45
  translate(width / 2, height / 2)

  for (let i = 0; i < layers; i++) {
    blendMode(LIGHTEST)
    noStroke()
    fill(0, 0, 80, 40)
    rect(-450, -450, 900, 900)
    noFill()
    blendMode(BLEND)

    const startAngle = random(-200, 200)
    beginShape()
    for (let angle = startAngle; angle <= 360 + startAngle; angle += step) {
      const r = 200 + (noise(i / 10) * 2 - 1) * 100
      const x = r * cos(angle)
      const y = r * sin(angle)
      stroke(0)
      strokeWeight(noise(angle) * 4)
      curveVertex(x, y)
    }
    endShape()
  }

  return ({ context, width, height }) => {}
}

canvasSketch(sketch, settings)

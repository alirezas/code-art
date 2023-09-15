const canvasSketch = require("canvas-sketch")
const p5 = require("p5")

new p5()

const settings = {
  p5: true,
  animation: false,
  dimensions: "a4",
  units: "px",
  attributes: {
    antialias: true,
  },
}

const sketch = ({ width, height }) => {
  const layers = 5
  const offset = 60
  const padding = 60
  const minSize = 20
  const maxSize = 50
  const colors = ["#eff7e1", "#a2d0c1", "#214151", "#d9dab0"]
  background("#f4f5db")
  rectMode(CENTER)
  noStroke()

  const columnCount = (width - offset) / padding
  const rowCount = (height - offset * 2) / padding

  for (let l = 0; l < layers; l++) {
    for (let i = 0; i < columnCount; i++) {
      for (let j = 0; j < rowCount; j++) {
        const colorIndex = int(random(colors.length))
        const size = random(minSize, maxSize)
        fill(colors[colorIndex])
        rect(offset + padding * i, offset + padding * j, size - 5, size - 5)
        ellipse(offset + padding * i, offset + padding * j, size, size)
      }
    }
  }

  return ({ context, width, height }) => {}
}

canvasSketch(sketch, settings)

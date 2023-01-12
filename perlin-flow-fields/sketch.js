const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

let seed = random.getRandomSeed()

const settings = {
  dimensions: [600, 600],
  animate: true,
  name: seed
}

const sketch = ({ width, height }) => {
  random.setSeed(seed)
  const particles = []
  const numberOfParticles = 5000
  const noiseScale = 0.001

  for (let i = 0; i < numberOfParticles; i++) {
    particles.push({ x: random.range(0, width), y: random.range(0, height) })
  }

  window.addEventListener('click', () => {
    seed = random.getRandomSeed()
    random.setSeed(seed)
  })

  return ({ context, width, height }) => {
    context.fillStyle = 'rgba(0,0,0,0.08)'
    context.fillRect(0, 0, width, height)

    context.fillStyle = 'white'
    particles.forEach((p) => {
      drawPoint({ context, x: p.x, y: p.y })
      const noise = random.noise2D(p.x * noiseScale, p.y * noiseScale)
      const angle = Math.PI * 2 * noise
      p.x += Math.cos(angle)
      p.y += Math.sin(angle)
      if (!(p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height)) {
        p.x = random.range(0, width)
        p.y = random.range(0, height)
      }
    })
  }
}

const drawPoint = ({ context, x, y }) => {
  context.beginPath()
  context.arc(x, y, 1, 0, 2 * Math.PI, true)
  context.fill()
}

canvasSketch(sketch, settings)

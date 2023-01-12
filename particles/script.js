/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const opts = {
  width: window.innerWidth,
  height: window.innerHeight,
  count: 2000
}
const mouse = {
  x: null,
  y: null,
  radius: 150
}
const particles = []

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (const p of particles) {
    p.update()
    p.draw()
  }

  requestAnimationFrame(animate)
}

const mouseEvent = (event) => {
  mouse.x = event.x + canvas.clientLeft / 2
  mouse.y = event.y + canvas.clientTop / 2
}

;(() => {
  canvas.width = opts.width
  canvas.height = opts.height

  for (const i of Array(opts.count).keys()) {
    const p = new Particle(
      Math.random() * opts.width,
      Math.random() * opts.height
    )
    particles.push(p)
  }

  window.addEventListener('mousemove', mouseEvent)
  animate()
})()

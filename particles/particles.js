class Particle {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.radius = 2
    this.color = 'red'
    this.density = (Math.random() * 30)
    this.baseX = this.x
    this.baseY = this.y
  }

  draw () {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
  }

  update () {
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const forceX = dx / distance
    const forceY = dy / distance
    const maxDistance = mouse.radius
    let force = (maxDistance - distance) / maxDistance

    if (force < 0) force = 0

    const dirX = (forceX * force * this.density)
    const dirY = (forceY * force * this.density)

    if (distance < maxDistance + this.radius) {
      this.x -= dirX
      this.y -= dirY
    } else {
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX
        this.x -= dx / 10
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY
        this.y -= dy / 10
      }
    }
  }
}

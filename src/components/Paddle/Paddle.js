import Phaser from 'phaser'
import GetOverlapX from 'phaser/src/physics/arcade/GetOverlapX'

export default class Paddle extends Phaser.Physics.Arcade.Image {
  get _speedX () {
    return 400
  }
  constructor (props) {
    const { scene, x, y } = props
    super(scene, x, y, 'spritesheet', 'paddle')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setImmovable()
  }

  moveLeft () {
    this.setVelocityX(-this._speedX)
  }

  moveRight () {
    this.setVelocityX(this._speedX)
  }

  stop () {
    this.body.stop()
  }

  onBorderCollide (borderBody) {
    const overlap = GetOverlapX(this.body, borderBody, false, 0)
    this.body.x -= overlap
    this.stop()
  }

  onBallCollide (ball) {
    const ballBody = ball.body
    const direction = ((ballBody.transform.x - this.body.transform.x) / this.width) + this.originX
    if (direction < 0.3) {
      ballBody.velocity.x = -Math.abs(ballBody.velocity.x)
    } else if (direction > 0.7) {
      ballBody.velocity.x = Math.abs(ballBody.velocity.x)
    }
  }
}

import Phaser from 'phaser'
import CONSTS from 'consts.json'
import Paddle from 'components/Paddle'
import Ball from 'components/Ball'
// import Brick from 'components/Brick'

export default class LevelScene extends Phaser.Scene {
  constructor () {
    super({ key: CONSTS.SCENE.LEVEL })
  }

  init () {
    this.borders = undefined
    this.ball = undefined
    this.bricks = undefined
    this.paddle = undefined
  }

  addBorders () {
    this.borders = this.physics.add.staticGroup()
    const { width } = this.sys.game.config

    // TOP
    this.borders.create(0, 0, 'spritesheet', 'border_top')
      .setOrigin(0, 0).refreshBody()

    // LEFT
    this.borders.create(0, 0, 'spritesheet', 'border_left')
      .setOrigin(0, 0).refreshBody()

    // RIGHT
    this.borders.create(width, 0, 'spritesheet', 'border_right')
      .setOrigin(1, 0).refreshBody()
  }

  addBall () {
    this.ball = new Ball({ scene: this, x: 200, y: 300 })
    this.ball.setCollideWorldBounds(true).setVelocity(200)
  }

  addPaddle () {
    const { width, height } = this.sys.game.config
    const x = width / 2
    const y = height * 0.85
    this.paddle = new Paddle({ scene: this, x, y })
  }

  addColliders () {
    this.physics.add.collider(this.ball, this.borders)
    this.physics.add.collider(this.paddle, this.borders, (paddle, border) => {
      paddle.onBorderCollide(border.body)
    })
    this.physics.add.collider(this.paddle, this.ball, (paddle, ball) => {
      paddle.onBallCollide(ball.body)
    })
  }

  create () {
    // Allow player to return to main menu
    this.input.keyboard.on('keydown_ESC', event => {
      this.scene.start(CONSTS.SCENE.MENU)
    })
    this.addBorders()
    this.addBall()
    this.addPaddle()
    this.addColliders()
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update () {
    if (this.cursors.left.isDown) {
      this.paddle.moveLeft()
    } else if (this.cursors.right.isDown) {
      this.paddle.moveRight()
    } else {
      this.paddle.stop()
    }
  }
}

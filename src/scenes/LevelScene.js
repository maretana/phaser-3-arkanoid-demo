import Phaser from 'phaser'
import CONSTS from 'consts.json'
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
    let topBorder, scale
    const { width } = this.sys.game.config

    // TOP
    topBorder = this.borders.create(0, 0, 'spritesheet', 'border_top').setOrigin(0, 0)
    scale = width / topBorder.width
    topBorder.setScale(scale, 1).refreshBody()

    // LEFT
    this.borders.create(0, 0, 'spritesheet', 'border_left')
      .setOrigin(0, 0).setScale(1, scale).refreshBody()

    // RIGHT
    this.borders.create(width, 0, 'spritesheet', 'border_right')
      .setOrigin(1, 0).setScale(1, scale).refreshBody()
  }

  addBall () {
    this.ball = this.physics.add.image(0, 0, 'spritesheet', 'ball')
      .setBounce(1).setScale(0.5)
  }

  addPaddle () {
    const { width, height } = this.sys.game.config
    const x = width / 2
    const y = height * 0.85
    this.paddle = this.physics.add.image(x, y, 'spritesheet', 'paddle')
  }

  create () {
    // Allow player to return to main menu
    this.input.keyboard.on('keydown_ESC', event => {
      this.scene.start(CONSTS.SCENE.MENU)
    })
    this.addBorders()
    this.addBall()
    this.physics.add.collider(this.ball, this.borders)
    this.addPaddle()
  }
}

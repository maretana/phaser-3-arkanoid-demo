import Phaser from 'phaser'
import CONSTS from 'consts.json'

export default class LevelScene extends Phaser.Scene {
  constructor () {
    super({ key: CONSTS.SCENE.LEVEL })
  }

  init () {
    this.borders = undefined
    this.ball = undefined
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
    window.left = this.borders.create(0, 0, 'spritesheet', 'border_left')
      .setOrigin(0, 0).setScale(1, scale).refreshBody()

    // RIGHT
    this.borders.create(width, 0, 'spritesheet', 'border_right')
      .setOrigin(1, 0).setScale(1, scale).refreshBody()
  }

  addBall () {
    this.ball = this.physics.add.sprite(0, 0, 'spritesheet', 'ball')
      // 400 / game width is arbitrary to calculate the size.
      .setBounce(1).setScale(400 / this.sys.game.config.width)
  }

  create () {
    // Allow player to return to main menu
    this.input.keyboard.on('keydown_ESC', event => {
      this.scene.start(CONSTS.SCENE.MENU)
    })
    this.addBorders()
    this.addBall()
    this.physics.add.collider(this.ball, this.borders)
  }
}

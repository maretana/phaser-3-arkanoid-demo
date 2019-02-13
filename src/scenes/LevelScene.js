import Phaser from 'phaser'
import CONSTS from 'consts.json'

export default class LevelScene extends Phaser.Scene {
  constructor () {
    super({ key: CONSTS.SCENE.LEVEL })
  }

  init () {
    this.borders = undefined
  }

  addBorders () {
    this.borders = this.physics.add.staticGroup()
    let topBorder, scale
    const { width } = this.sys.game.config

    // TOP
    topBorder = this.borders.create(0, 0, 'spritesheet', 'border_top').setOrigin(0, 0)
    scale = width / topBorder.width
    topBorder.setScale(scale).refreshBody()

    // LEFT
    window.left = this.borders.create(0, 0, 'spritesheet', 'border_left')
      .setOrigin(0, 0).setScale(scale).refreshBody()

    // RIGHT
    this.borders.create(width, 0, 'spritesheet', 'border_right')
      .setOrigin(1, 0).setScale(scale).refreshBody()
  }

  create () {
    // Allow player to return to main menu
    this.input.keyboard.on('keydown_ESC', event => {
      this.scene.start(CONSTS.SCENE.MENU)
    })
    this.addBorders()
  }
}

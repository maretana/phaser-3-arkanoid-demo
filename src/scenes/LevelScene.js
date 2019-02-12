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
    let border, scale
    const { width, height } = this.sys.game.config
    const radians = Math.PI / 180

    // TOP
    border = this.borders.create(0, 0, 'spritesheet', 'border').setOrigin(0, 0)
    scale = width / border.width
    border.setScale(scale)

    // LEFT
    border = this.borders.create(0, 0, 'spritesheet', 'border')
      .setRotation(270 * radians).setOrigin(1, 0).setScale(scale)

    // RIGHT
    border = this.borders.create(width, 0, 'spritesheet', 'border')
      .setRotation(90 * radians).setOrigin(0, 0).setScale(scale)
  }

  create () {
    // Allow player to return to main menu
    this.input.keyboard.on('keydown_ESC', event => {
      this.scene.start(CONSTS.SCENE.MENU)
    })
    this.addBorders()
  }
}

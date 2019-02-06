import Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
  static MENU_OPTION = Object.freeze({
    PLAY: 0,
    CREDITS: 1
  })

  constructor () {
    super({ key: 'MENU_SCENE' })
  }

  addMenuText () {
    let centerX = this.sys.game.config.width / 2
    this.add.bitmapText(centerX, 16, 'unibody', 'ARKANOID', 64).setOrigin(0.5, 0)
    this.add.bitmapText(centerX, 90, 'unibody', 'a game made with Phaser 3', 12).setOrigin(0.5, 0)
    this.add.bitmapText(centerX, 152, 'unibody', 'PLAY', 30).setOrigin(0.5, 0)
    this.add.bitmapText(centerX, 192, 'unibody', 'CREDITS', 30).setOrigin(0.5, 0)
    this.add.bitmapText(centerX, 272, 'unibody', 'Instructions', 14).setOrigin(0.5, 0)
    this.add.bitmapText(centerX, 294, 'unibody', 'use arrow keys to move - spacebar to select and shoot', 14).setOrigin(0.5, 0)
    this.add.bitmapText(this.sys.game.config.width - 8, this.sys.game.config.height - 8, 'unibody', 'Mario Retana - 2019', 14).setOrigin(1, 1)
  }

  preload () {}
  create () {
    window.debugThis = this
    this.addMenuText()
  }
  update () {}
}

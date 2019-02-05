import Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'MENU_SCENE' })
  }
  preload () {}
  create () {
    this.add.bitmapText(16, 16, 'unibody', 'This is the menu scene', 16)
  }
  update () {}
}

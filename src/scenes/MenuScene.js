import Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'MENU_SCENE' })
  }
  preload () {}
  create () {
    this.add.text(16, 16, 'I have been created!', {})
  }
  update () {}
}

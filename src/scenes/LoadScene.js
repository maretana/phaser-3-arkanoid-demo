import Phaser from 'phaser'

export default class LoadScene extends Phaser.Scene {
  constructor () {
    super({ key: 'LOADING_SCENE' })
  }
  preload () {
    this.load.bitmapFont('unibody', 'assets/font/unibody.png', 'assets/font/unibody.fnt')
  }
  create () {
    this.scene.start('MENU_SCENE')
  }
  update () {}
}

import Phaser from 'phaser'

export default class LoadScene extends Phaser.Scene {
  constructor () {
    super({ key: 'LOADING_SCENE' })
  }
  preload () {
    this.add.text(16, 64, 'I am the loader!', {})
  }
  create () {
    this.scene.start('MENU_SCENE')
  }
  update () {}
}

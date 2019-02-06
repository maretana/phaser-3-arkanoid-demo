import Phaser from 'phaser'
import CONSTS from 'consts.json'

console.log('consts:', CONSTS)

export default class LoadScene extends Phaser.Scene {
  constructor () {
    super({ key: CONSTS.SCENE.LOADING })
  }
  preload () {
    this.load.bitmapFont(CONSTS.FONT.DEFAULT, 'assets/font/unibody.png', 'assets/font/unibody.fnt')
  }
  create () {
    this.scene.start(CONSTS.SCENE.MENU)
  }
  update () {}
}

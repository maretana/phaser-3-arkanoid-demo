import Phaser from 'phaser'
import CONSTS from 'consts.json'

export default class LoadScene extends Phaser.Scene {
  constructor () {
    super({ key: CONSTS.SCENE.LOADING })
  }
  preload () {
    this.load.bitmapFont(CONSTS.FONT.DEFAULT, 'assets/font/unibody.png', 'assets/font/unibody.fnt')
    this.load.atlas('spritesheet', 'assets/atlas/spritesheet.png', 'assets/atlas/spritesheet.json')
  }
  create () {
    this.scene.start(CONSTS.SCENE.MENU)
    this.scene.remove()
  }
  update () {}
}

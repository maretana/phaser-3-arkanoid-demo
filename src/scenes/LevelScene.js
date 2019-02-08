import Phaser from 'phaser'
import CONSTS from 'consts.json'

export default class LevelScene extends Phaser.Scene {
  constructor () {
    super({ key: CONSTS.SCENE.LEVEL })
  }
  create () {
    this.input.keyboard.on('keydown_ESC', event => {
      this.scene.start(CONSTS.SCENE.MENU)
    })
  }
}

import Phaser from 'phaser'
import CONSTS from 'consts.json'

export default class LevelScene extends Phaser.Scene {
  constructor () {
    super({ key: CONSTS.SCENE.LEVEL })
  }
}

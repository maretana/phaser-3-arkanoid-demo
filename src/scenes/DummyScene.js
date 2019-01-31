import Phaser from 'phaser'

export default class DummyScene extends Phaser.Scene {
  preload () {}
  create () {
    console.log('I have been created')
  }
  update () {}
}

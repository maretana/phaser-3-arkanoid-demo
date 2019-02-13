import Phaser from 'phaser'

export default class Brick extends Phaser.Physics.Arcade.Image {
  constructor (params) {
    const { scene, x, y, color, isBreakable } = params
    super(scene, x, y, 'spritesheet', 'brick')
    scene.add.existing(this)

    // Properties
    this.health = isBreakable ? 2 : 1
    this.setTint(color)
  }
}

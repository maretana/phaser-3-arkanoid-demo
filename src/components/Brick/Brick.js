import Phaser from 'phaser'

/**
 * Total width the borders take on the game screen
 * @type {Number}
 */
const TOTAL_BORDER_WIDTH = 50
/**
 * Max amount of bricks that would display from left side to right side
 * @type {Number}
 */
const MAX_BRICKS_PER_ROW = 18

export default class Brick extends Phaser.Physics.Arcade.Image {
  constructor (params) {
    const { scene, x, y, color, isBreakable } = params
    super(scene, x, y, 'spritesheet', 'brick')
    scene.add.existing(this)
    scene.bricks.add(this)

    this.setScale(((scene.sys.game.config.width - TOTAL_BORDER_WIDTH) / MAX_BRICKS_PER_ROW) / this.width)
      .setOrigin(0, 0).refreshBody()

    // Properties
    this.health = isBreakable ? 2 : 1
    this.setTint(color)
  }

  onBallCollide (ball) {
    if (--this.health) {
      this.setTexture('spritesheet', 'brick_damaged')
    } else {
      this.destroy()
    }
  }
}

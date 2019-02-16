import Phaser from 'phaser'

export default class Ball extends Phaser.Physics.Arcade.Image {
  constructor (props) {
    const { scene, x, y } = props
    super(scene, x, y, 'spritesheet', 'ball')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setBounce(1).setScale(0.75).setCircle(this.width / 2)
    this.body.setAllowRotation(false)
  }
}

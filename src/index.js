import Phaser from 'phaser'
import DummyScene from 'scenes/DummyScene'

import 'styles/styles.css'

let game = new Phaser.Game({ // eslint-disable-line no-unused-vars
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  scene: [DummyScene]
})

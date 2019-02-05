import Phaser from 'phaser'
import LoadScene from 'scenes/LoadScene'
import MenuScene from 'scenes/MenuScene'

import 'styles/styles.css'

let game = new Phaser.Game({ // eslint-disable-line no-unused-vars
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  scene: [LoadScene, MenuScene]
})

import Phaser from 'phaser'
import LoadScene from 'scenes/LoadScene'
import MenuScene from 'scenes/MenuScene'
import LevelScene from 'scenes/LevelScene'

import 'styles/styles.css'

let game = new Phaser.Game({ // eslint-disable-line no-unused-vars
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  scene: [LoadScene, MenuScene, LevelScene],
  physics: {
    default: 'arcade'
  }
})

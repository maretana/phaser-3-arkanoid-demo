import Phaser from 'phaser'
import LoadScene from 'scenes/LoadScene'
import MenuScene from 'scenes/MenuScene'
import LevelScene from 'scenes/LevelScene'

import 'styles/styles.scss'

let game = new Phaser.Game({ // eslint-disable-line no-unused-vars
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaserGame',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1200,
    height: 675
  },
  scene: [LoadScene, MenuScene, LevelScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: 0
    }
  }
})

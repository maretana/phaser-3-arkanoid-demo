import Phaser from 'phaser'
import CONSTS from 'consts.json'

const OPTION_SELECTED_COLOR = 0x00aa00

export default class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: CONSTS.SCENE.MENU })
    this.menuOptionObjects = []
    this.selectedMenuOption = 0
  }

  addMenuOption (x, y, text, action) {
    this.menuOptionObjects.push(this.add.bitmapText(x, y, CONSTS.FONT.DEFAULT, text, 30).setOrigin(0.5, 0))
  }

  addMenuText () {
    let centerX = this.sys.game.config.width / 2
    this.add.bitmapText(centerX, 16, CONSTS.FONT.DEFAULT, 'ARKANOID', 64).setOrigin(0.5, 0)
    this.add.bitmapText(centerX, 90, CONSTS.FONT.DEFAULT, 'a game made with Phaser 3', 12).setOrigin(0.5, 0)
    this.addMenuOption(centerX, 152, 'PLAY')
    this.addMenuOption(centerX, 192, 'CREDITS')
    this.add.bitmapText(centerX, 272, CONSTS.FONT.DEFAULT, 'Instructions', 14).setOrigin(0.5, 0)
    this.add.bitmapText(centerX, 294, CONSTS.FONT.DEFAULT, 'use arrow keys to move - spacebar to select and shoot', 14).setOrigin(0.5, 0)
    this.add.bitmapText(this.sys.game.config.width - 8, this.sys.game.config.height - 8, CONSTS.FONT.DEFAULT, 'Mario Retana - 2019', 14).setOrigin(1, 1)
  }

  addCursor () {
    let cursorX = this.menuOptionObjects.reduce((acc, elem, index) => {
      return Math.min(acc, elem.getTextBounds().global.x)
    }, this.sys.game.config.width) - 10
    this.cursor = this.add.bitmapText(cursorX, this.menuOptionObjects[this.selectedMenuOption].y, CONSTS.FONT.DEFAULT, '>', 30).setOrigin(1, 0).setTint(OPTION_SELECTED_COLOR)
    this.cursorBlink = setInterval(() => {
      let alpha = this.cursor.alpha
      this.cursor.setAlpha((alpha + 1) % 2)
    }, 400)
  }

  onMenuSelectionChange (nextOption) {
    this.menuOptionObjects[this.selectedMenuOption].clearTint()
    this.selectedMenuOption = nextOption
    this.menuOptionObjects[this.selectedMenuOption].setTint(OPTION_SELECTED_COLOR)
    this.cursor.setY(this.menuOptionObjects[this.selectedMenuOption].y)
  }

  setupKeyboardEvents () {
    this.input.keyboard.on('keydown_UP', event => {
      this.onMenuSelectionChange((this.selectedMenuOption - 1 + this.menuOptionObjects.length) % this.menuOptionObjects.length)
    })
    this.input.keyboard.on('keydown_DOWN', event => {
      this.onMenuSelectionChange((this.selectedMenuOption + 1) % this.menuOptionObjects.length)
    })
  }

  preload () {}

  create () {
    window.debugThis = this
    this.addMenuText()
    this.addCursor()
    this.onMenuSelectionChange(this.selectedMenuOption)
    this.setupKeyboardEvents()
  }
  update () {}
}
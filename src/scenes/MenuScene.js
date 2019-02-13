import Phaser from 'phaser'
import CONSTS from 'consts.json'

const OPTION_SELECTED_COLOR = 0x00aa00
const TEXT_SIZE = {
  MENU_OPTION: 30,
  TITLE: 64,
  SUBTITLE: 12,
  INSTRUCTIONS: 14
}

export default class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: CONSTS.SCENE.MENU })
  }

  init () {
    this.menuOptionObjects = []
    this.selectedMenuOption = 0
  }

  addMenuOption (x, y, text, action) {
    this.menuOptionObjects.push({
      text: this.add.bitmapText(x, y, CONSTS.FONT.DEFAULT, text, TEXT_SIZE.MENU_OPTION).setOrigin(0.5, 0),
      callback: action
    })
  }

  addMenuText () {
    let centerX = this.sys.game.config.width / 2
    this.add.bitmapText(centerX, 16, CONSTS.FONT.DEFAULT, 'ARKANOID', TEXT_SIZE.TITLE).setOrigin(0.5, 0)
    this.add.bitmapText(centerX, 90, CONSTS.FONT.DEFAULT, 'a game made with Phaser 3', TEXT_SIZE.SUBTITLE).setOrigin(0.5, 0)
    this.addMenuOption(centerX, 152, 'PLAY', () => {
      this.beforeShutdown()
      this.scene.stop()
      this.scene.start(CONSTS.SCENE.LEVEL)
    })
    this.addMenuOption(centerX, 192, 'CREDITS')
    this.add.bitmapText(centerX, 272, CONSTS.FONT.DEFAULT, 'Instructions', TEXT_SIZE.INSTRUCTIONS).setOrigin(0.5, 0)
    this.add.bitmapText(
      centerX, 294, CONSTS.FONT.DEFAULT,
      'use arrow keys to move - spacebar to select and shoot\r\nESC to return to this screen',
      TEXT_SIZE.INSTRUCTIONS, Phaser.GameObjects.BitmapText.ALIGN_CENTER
    ).setOrigin(0.5, 0)
    this.add.bitmapText(this.sys.game.config.width - 8, this.sys.game.config.height - 8, CONSTS.FONT.DEFAULT, 'Mario Retana - 2019', TEXT_SIZE.INSTRUCTIONS).setOrigin(1, 1)
  }

  addCursor () {
    let cursorX = this.menuOptionObjects.reduce((acc, { text }, index) => {
      return Math.min(acc, text.getTextBounds().global.x)
    }, this.sys.game.config.width) - 10
    this.cursor = this.add.bitmapText(cursorX, this.menuOptionObjects[this.selectedMenuOption].text.y, CONSTS.FONT.DEFAULT, '>', TEXT_SIZE.MENU_OPTION).setOrigin(1, 0).setTint(OPTION_SELECTED_COLOR)
    this.cursorBlink = setInterval(() => {
      let alpha = this.cursor.alpha
      this.cursor.setAlpha((alpha + 1) % 2)
    }, 400)
  }

  onMenuSelectionChange (nextOption) {
    this.menuOptionObjects[this.selectedMenuOption].text.clearTint()
    this.selectedMenuOption = nextOption
    this.menuOptionObjects[this.selectedMenuOption].text.setTint(OPTION_SELECTED_COLOR)
    this.cursor.setY(this.menuOptionObjects[this.selectedMenuOption].text.y)
  }

  setupKeyboardEvents () {
    this.input.keyboard.on('keydown_UP', event => {
      this.onMenuSelectionChange((this.selectedMenuOption - 1 + this.menuOptionObjects.length) % this.menuOptionObjects.length)
    })
    this.input.keyboard.on('keydown_DOWN', event => {
      this.onMenuSelectionChange((this.selectedMenuOption + 1) % this.menuOptionObjects.length)
    })
    this.input.keyboard.on('keydown_SPACE', event => {
      let action = this.menuOptionObjects[this.selectedMenuOption].callback
      if (action) action()
    })
  }

  preload () {}

  beforeShutdown () {
    clearInterval(this.cursorBlink)
  }

  create () {
    this.addMenuText()
    this.addCursor()
    this.onMenuSelectionChange(this.selectedMenuOption)
    this.setupKeyboardEvents()
  }
  update () {}
}

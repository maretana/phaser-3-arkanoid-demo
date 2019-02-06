import Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'MENU_SCENE' })
    this.menuOptionObjects = []
    this.selectedMenuOption = 0
  }

  addMenuOption (x, y, text, action) {
    this.menuOptionObjects.push(this.add.bitmapText(x, y, 'unibody', text, 30).setOrigin(0.5, 0))
  }

  addMenuText () {
    let centerX = this.sys.game.config.width / 2
    this.add.bitmapText(centerX, 16, 'unibody', 'ARKANOID', 64).setOrigin(0.5, 0)
    this.add.bitmapText(centerX, 90, 'unibody', 'a game made with Phaser 3', 12).setOrigin(0.5, 0)
    this.addMenuOption(centerX, 152, 'PLAY')
    this.addMenuOption(centerX, 192, 'CREDITS')
    this.add.bitmapText(centerX, 272, 'unibody', 'Instructions', 14).setOrigin(0.5, 0)
    this.add.bitmapText(centerX, 294, 'unibody', 'use arrow keys to move - spacebar to select and shoot', 14).setOrigin(0.5, 0)
    this.add.bitmapText(this.sys.game.config.width - 8, this.sys.game.config.height - 8, 'unibody', 'Mario Retana - 2019', 14).setOrigin(1, 1)
  }

  onMenuSelectionChange (nextOption) {
    this.menuOptionObjects[this.selectedMenuOption].clearTint()
    this.selectedMenuOption = nextOption
    this.menuOptionObjects[this.selectedMenuOption].setTint(0x00aa00)
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
    let cursorX = this.menuOptionObjects.reduce((acc, elem, index) => {
      return Math.min(acc, elem.getTextBounds().global.x)
    }, this.sys.game.config.width) - 10
    this.cursor = this.add.bitmapText(cursorX, this.menuOptionObjects[this.selectedMenuOption].y, 'unibody', '>', 30).setOrigin(1, 0).setTint(0x00aa00)
    this.cursorBlink = setInterval(() => {
      let alpha = this.cursor.alpha
      this.cursor.setAlpha((alpha + 1) % 2)
    }, 400)
    this.onMenuSelectionChange(this.selectedMenuOption)
    this.setupKeyboardEvents()
  }
  update () {}
}

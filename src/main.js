import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import GameState from './states/Game'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = window.innerWidth * window.devicePixelRatio
    const height = window.innerHeight * window.devicePixelRatio

    super(width, height, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Game', GameState, false)

    this.state.start('Boot')
  }
}

FBInstant.initializeAsync()
  .then(() => window.game = new Game())

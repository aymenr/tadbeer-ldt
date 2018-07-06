import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import GameState from './states/Game'

import { connect } from './ui/main'

import config from './config'

if (__DEV__) {
  //include mock API
  require("expose-loader?FBInstant!./services/MockFb")
}
class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = window.innerWidth * window.devicePixelRatio
    const height = window.innerHeight * window.devicePixelRatio
    let containerId = 'content'

    super(width, height, Phaser.AUTO, containerId, null)

    this.state.add('Boot', BootState, false)
    this.state.add('Game', GameState, false)

    this.state.start('Boot')

    connect(containerId, width, height);
  }
}

FBInstant.initializeAsync()
  .then(() => window.game = new Game())

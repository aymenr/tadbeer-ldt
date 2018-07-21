import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import GameState from './states/Game'
import Level1 from './states/Level1'
import Level2 from './states/Level2'
import Level3 from './states/Level3'

import { connect } from './ui/main'

import config from './config'

if (__LOCAL_DEV__) {
  //include mock API
  require("expose-loader?FBInstant!./services/MockFb")
}
class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = 0//window.innerWidth * window.devicePixelRatio
    const height = 0//window.innerHeight * window.devicePixelRatio
    let containerId = 'content'

    super(width, height, Phaser.AUTO, containerId, null)

    this.state.add('Boot', BootState, false)
    this.state.add('Game', GameState, false)
    this.state.add('Level1', Level1, false)
    this.state.add('Level2', Level2, false)
    this.state.add('Level3', Level3, false)

    this.state.start('Boot')
  }
}

FBInstant.initializeAsync()
  .then(() => window.game = new Game())

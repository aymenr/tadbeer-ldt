import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import GameState from './states/Game'
import Level1 from './states/Level1'


import Level2 from './states/Level2'
import Level3 from './states/Level3'
import Menu from './states/Menu'
import Level4 from './states/Level4'

import Splash from './states/Splash'
import Splash2 from './states/Splash2'
import Splash3 from './states/Splash3'
import Splash4 from './states/Splash4'


import { connect } from './ui/main'

import config from './config'
import style from 'slick-carousel/slick/slick.css'
import style1 from 'slick-carousel/slick/slick-theme.css'
//import 'react-tippy/dist/tippy.css'

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
    this.state.add('Menu', Menu, false)

    this.state.add('Level2', Level2, false)
    this.state.add('Level3', Level3, false)
    this.state.add('Level4', Level4, false)

    this.state.add('Splash', Splash, false)
    this.state.add('Splash2', Splash2, false)
    this.state.add('Splash3', Splash3, false)
    this.state.add('Splash4', Splash4, false)


    this.state.start('Boot')
  }
}

FBInstant.initializeAsync()
  .then(() => window.game = new Game())

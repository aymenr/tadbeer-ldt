import Phaser from 'phaser'
import WebFont from 'webfontloader'
import config from '../config';

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#EDEEC9'
  }

  preload() {
    FBInstant.setLoadingProgress(50);
    //load any assets here 
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    FBInstant.setLoadingProgress(100);
  }

  create() {
    FBInstant.startGameAsync()
      .then(() => this.state.start('Game'))
  }
}

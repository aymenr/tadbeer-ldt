import Phaser from 'phaser'

export default class extends Phaser.State {
  init() {
    this.game.stage.backgroundColor = '#ffffff';
  }

  preload() {
    FBInstant.setLoadingProgress(50);
    //load any assets here 
    FBInstant.setLoadingProgress(100);
  }

  create() {
    FBInstant.startGameAsync()
      .then(() => this.state.start('Game'))
  }
}

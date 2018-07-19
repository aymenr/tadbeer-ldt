import Phaser from 'phaser'

export default class extends Phaser.State {
  init() {
    this.game.stage.backgroundColor = '#ffffff';
  }

  preload() {
    FBInstant.setLoadingProgress(50);
    //load any assets here
    this.load.image('dude', 'assets/images/phaser-dude.png')
    this.load.image('road1', 'assets/images/tiles/road1.png')
    this.load.image('road2', 'assets/images/tiles/road2.png')
    this.load.image('turn5', 'assets/images/tiles/turn5.png')
    this.load.image('grass', 'assets/images/tiles/grass.png')
    this.load.image('water', 'assets/images/tiles/water.png')
    this.load.image('water', 'assets/images/tiles/sewage_open.png')
    this.load.image('goal-road', 'assets/images/tiles/road1-goal.png')
    this.load.image('wall1', 'assets/images/wall1.png')
    this.load.image('wall2', 'assets/images/wall2.png')
    this.load.atlasJSONHash('passenger1', 'assets/images/passenger1.png', 'assets/images/passenger1.json');
    this.load.atlasJSONHash('passenger2', 'assets/images/passenger2.png', 'assets/images/passenger2.json');
    this.load.atlasJSONHash('rickshaw', 'assets/images/rickshaw.png', 'assets/images/rickshaw.json');

    FBInstant.setLoadingProgress(100);
  }

  create() {
    FBInstant.startGameAsync()
      .then(() => this.state.start('Game'))
  }
}

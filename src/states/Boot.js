import Phaser from 'phaser'

export default class extends Phaser.State {
  init() {
    this.game.stage.backgroundColor = '#ffffff';
  }

  preload() {
    FBInstant.setLoadingProgress(50);
    //load any assets here
    this.load.image('road1', 'assets/images/tiles/road1.png')
    this.load.image('road2', 'assets/images/tiles/road2.png')
    
    this.load.image('grass', 'assets/images/tiles/grass.png')
    this.load.image('goal-road', 'assets/images/tiles/road1-goal.png')
    this.load.image('goal-road2', 'assets/images/tiles/road2-goal.png')
    

    this.load.image('nehar-lower', 'assets/images/tiles/nehar-lower.png')

    this.load.image('road-up-left', 'assets/images/tiles/turn7.png')
    this.load.image('road-left-down', 'assets/images/tiles/turn1.png')
    this.load.image('road-down-left', 'assets/images/tiles/turn9.png')
    this.load.image('road-left-up', 'assets/images/tiles/turn3.png')
    this.load.image('tree', 'assets/images/tree.png')
    this.load.image('bench', 'assets/images/bench.png')
    this.load.image('lamppost-1', 'assets/images/lamppost1.png')
    this.load.image('lamppost-2', 'assets/images/lamppost2.png')
    this.load.image('khamba1', 'assets/images/khamba1.png')
    this.load.image('khamba2', 'assets/images/khamba2.png')
    this.load.image('gutter', 'assets/images/sewage.png')
    this.load.image('building1', 'assets/images/building1.png')
    this.load.image('building2', 'assets/images/building2.png')


    game.load.image('background1', 'assets/images/blurlevel1.png');
    game.load.image('background2', 'assets/images/blurlevel2.png');
    game.load.image('background3', 'assets/images/blurlevel3.png');
    game.load.image('background4', 'assets/images/blurlevel4.png');

    this.load.audio('rickshaw-sound', 'assets/audio/rickshaw.mp3')
    this.load.audio('rickshaw-horn', 'assets/audio/rickshaw-horn.mp3')

    
    this.load.atlasJSONHash('passenger1', 'assets/images/passenger1.png', 'assets/images/passenger1.json');
    this.load.atlasJSONHash('passenger2', 'assets/images/passenger2.png', 'assets/images/passenger2.json');
    this.load.atlasJSONHash('passenger3', 'assets/images/passenger3.png', 'assets/images/passenger3.json');
    this.load.atlasJSONHash('rickshaw', 'assets/images/rickshaw.png', 'assets/images/rickshaw.json');

    FBInstant.setLoadingProgress(100);
  }

  create() {
    FBInstant.startGameAsync()

      .then(() => this.state.start('Menu'))

  }
}

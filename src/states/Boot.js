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
    this.load.image('wall1', 'assets/images/wall1.png')
    this.load.image('wall2', 'asisets/images/wall2.png')
    this.load.image('policeNaka', 'assets/images/police.png')
    this.load.image('nehar-lower', 'assets/images/tiles/nehar-lower.png')

    this.load.image('road-up-left', 'assets/images/tiles/turn7.png')
    this.load.image('road-left-down', 'assets/images/tiles/turn1.png')
    this.load.image('road-down-left', 'assets/images/tiles/turn9.png')
    this.load.image('road-left-up', 'assets/images/tiles/turn3.png')
    this.load.image('tree', 'assets/images/tree.png')
    this.load.image('bench', 'assets/images/bench.png')
    this.load.image('lamppost-1', 'assets/images/lamppost1.png')
    this.load.image('lamppost-2', 'assets/images/lamppost2.png')
    this.load.image('khamba', 'assets/images/khamba.png')

    this.load.image('khamba1half', 'assets/images/khamba1half.png')
    this.load.image('khamba2half', 'assets/images/khamba2half.png')

    
    this.load.atlasJSONHash('passenger1', 'assets/images/passenger1.png', 'assets/images/passenger1.json');
    this.load.atlasJSONHash('passenger2', 'assets/images/passenger2.png', 'assets/images/passenger2.json');
    this.load.atlasJSONHash('passenger3', 'assets/images/passenger3.png', 'assets/images/passenger3.json');
    this.load.atlasJSONHash('rickshaw', 'assets/images/rickshaw.png', 'assets/images/rickshaw.json');

    FBInstant.setLoadingProgress(100);
  }

  create() {
    FBInstant.startGameAsync()
      .then(() => this.state.start('Game'))
  }
}

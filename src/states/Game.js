/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import ace from 'ace-builds'
import 'modeJS';
import Eval from '../services/Eval'
import { compile } from '@sweet-js/core/dist/browser-sweet'
import NodeLoader from '@sweet-js/core/dist/node-loader'
import Urdu from '../services/Urdu.sjs'
import Grid from '../components/IsoGrid'

export default class extends Phaser.State {
  init() { 
    this.container = document.querySelector('#content');
    //this.compiler = new Compile()
  }

  preload() { }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    var grid = new Grid(6, 6, 'grass')

    grid.modify(4,3,'water')
    grid.modify(4,4,'water')
    for (var i=0; i<6; i++){
      grid.modify(1,i,'road1')
    }

    grid.display()

    // //Initialize sprite
    var rickshaw = game.add.sprite(0, 0, 'rickshaw1')

    var wall = game.add.sprite(0, 0, 'wall2')

    //Place at particular coordinates
   	grid.placeObject(1,0,rickshaw)
    grid.placeObject(4,5, wall)
   	// //Move a certain number of paces along the grid
    grid.moveObject(1,4,rickshaw)

  }
}

function cartesianToIsometric(cartPt){
    var tempPt=new Phaser.Point();
    tempPt.x=cartPt.x-cartPt.y;
    tempPt.y=(cartPt.x+cartPt.y)/2;
    return (tempPt);
}

function isometricToCartesian(isoPt){
    var tempPt=new Phaser.Point();
    tempPt.x=(2*isoPt.y+isoPt.x)/2;
    tempPt.y=(2*isoPt.y-isoPt.x)/2;
    return (tempPt);
}

function getTileCoordinates(cartPt, tileHeight){
    var tempPt=new Phaser.Point();
    tempPt.x=Math.floor(cartPt.x/tileHeight);
    tempPt.y=Math.floor(cartPt.y/tileHeight);
    return(tempPt);
}

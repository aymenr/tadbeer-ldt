/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import ace from 'ace-builds'
import 'modeJS';
import Eval from '../services/Eval'
import { compile } from '@sweet-js/core/dist/browser-sweet'
import NodeLoader from '@sweet-js/core/dist/node-loader'
import Urdu from '../services/Urdu.sjs'
import Grid from '../components/Grid'

export default class extends Phaser.State {
  init() { 
    this.container = document.querySelector('#content');
    ace.config.set("basePath", "/node_modules/ace-builds/src");
    this.editor = ace.edit(null, {
      minLines: 10,
      maxLines: 2000,
      fontSize: '20px',
      mode: "ace/mode/javascript",
    });
    this.editor.selection.setRange(new ace.Range(0,0,0,3));
    //this.compiler = new Compile()
  }

  preload() { }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    var grid = new Grid(6, 6, 100, this.game)
    grid.show()

    //Initialize sprite
    var player = this.game.add.sprite(0, 0, 'dude')
    this.game.physics.arcade.enable(player);
    player.anchor.setTo(0.5, 0.5);
    player.body.collideWorldBounds = true;
    player.body.bounce.setTo(0, 0);

    //Place at particular coordinates
   	grid.placeAt(0,0,player)

   	//Move a certain number of paces along the grid
    grid.moveObject(3,2,player)
  }

  /*
  buttonClick = () => {
    let code = this.editor.getValue()
    let temp = new NodeLoader('./')

    let compiled = compile(Urdu + ' ' + code)
    Eval(compiled.code, (err, data) => {
        if (data.log)
            document.querySelector('#answer').innerHTML = data.log + "\n"
        if (data.answer != '"undefined"')
            document.querySelector('#answer').innerHTML += data.answer
    })
  }
  */
}

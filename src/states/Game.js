/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import ace from 'ace-builds'
import 'modeJS';
import Eval from '../services/Eval'
import { compile } from '@sweet-js/core/dist/browser-sweet'
import NodeLoader from '@sweet-js/core/dist/node-loader'
import Urdu from '../services/Urdu.sjs'

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
    let container = document.createElement('div');
    container.id = 'game_container';
    document.body.appendChild(container);
    container.appendChild(this.editor.container);
    container.appendChild(this.getButton());
    container.appendChild(this.getAnswerContainer())
    container.style = 'position:absolute; top:0; left: 0; width: 100%';
   	

    let board = document.getElementById('content')
   	container.appendChild(board)

    game.physics.startSystem(Phaser.Physics.ARCADE);

    var grid = new AlignGrid(6, 6, 100)
    grid.show()

    //Initialize sprite
    var player = game.add.sprite(0, 0, 'dude')
    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5, 0.5);
    player.body.collideWorldBounds = true;
    player.body.bounce.setTo(0, 0);

    //Place at particular coordinates
   	grid.placeAt(0,0,player)

   	//Move a certain number of paces along the grid
    grid.moveObject(3,2,player)



  }

  getButton() {
    let button = document.createElement('button');
    button.id = 'run_code';
    button.innerHTML = "Run";
    button.onclick = this.buttonClick;
    return button;
  }

  getAnswerContainer() {
    let div = document.createElement('div');
    div.id = 'answer'
    return div
  }

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
}

class AlignGrid extends Phaser.Group {
    constructor(cols = 3, rows = 3, cw = 100) {
        super(game);
        //promote to a class variable
        this.cellWidth = cw
        this.rows = rows
        this.cols = cols
    }

    placeAt(xx,yy,obj) {
    	//Calculate target coordinates
    	var x2 = this.cellWidth * xx + this.cellWidth / 2;
        var y2 = this.cellWidth * yy + this.cellWidth / 2;
        obj.x = x2;
        obj.y = y2;

    }

    moveObject(xx,yy, obj) {
	  //xx is number of cells to move right
	  //yy is number of cells to move down

      var pixels //Number of pixels to move

      var speed = 100
      var direction //Direction in which to move

      //Direction is positive or negative depending on sign of xx and yy 
      direction = xx > 0 ? 1 : -1
      pixels = xx*this.cellWidth
      //Object is given a starting constant velocity
      obj.body.velocity.x = speed * direction

      //Reset velocity to zero when target cell is reached
      setTimeout(function(){ obj.body.velocity.x=0 }, (pixels/speed)*1000);

      //Repeated for downward movement
      direction = yy > 0 ? 1 : -1
      pixels = yy*this.cellWidth
      obj.body.velocity.y = speed * direction

      setTimeout(function(){ obj.body.velocity.y=0 }, (pixels/speed)*1000);  
    }


    //mostly for planning and debugging this will
    //create a visual representation of the grid
    show() {
        this.graphics = game.add.graphics();
        this.graphics.lineStyle(1, 0x000000, 1);

        for (var i = 0; i <= this.rows*this.cellWidth; i += this.cellWidth) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.cols*this.cellWidth);
        }
        for (var i = 0; i <= this.cols*this.cellWidth; i += this.cellWidth) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.rows*this.cellWidth, i);
        }
    }
}
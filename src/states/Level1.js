/* globals __DEV__ */
import Phaser from 'phaser'
import 'modeJS'
import Grid from '../components/IsoGrid'
import { connect } from '../ui/main'
import CodeService from '../services/Code'
import Level1Wrap from '../wrappers/Level1'

export default class Level1 extends Phaser.State {
  init() {
    this.sizeX = 6
    this.sizeY = 6
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.grid = new Grid(this.sizeX, this.sizeY, 'grass')

    this.grid.modify(4,3,'water')
    this.grid.modify(4,4,'water')
    for (let i=0; i<this.sizeX; i++){
      this.grid.modify(1,i,'road1')
    }

    this.grid.display()

    // //Initialize sprite
    this.rickshaw = game.add.sprite(0, 0, 'rickshaw1')

    let wall = game.add.sprite(0, 0, 'wall2')

    //Place at particular coordinates
   	this.grid.placeObject(1,0,this.rickshaw)
    this.grid.placeObject(4,5, wall)
   	// Move a certain number of paces along the grid
    this.grid.moveObject(1,4,this.rickshaw)

    connect('content', this.makeButtons(), this.runCodeCb, this.makeEditorData())
  }

  wrapCode = (code) => Level1Wrap + " " + code

  runCodeCb = (code) => {
    code = this.wrapCode(code) //wrap code in our wrapper
    let compiled = CodeService.compileCode(code)
    CodeService.runCode(compiled.code, (err, data) => {
      //handle this later
      if(err)
        return
      
      if(!data.answer)
        return
      let parsed = JSON.parse(data.answer)
      
      if(!parsed.moves)
        return

      parsed.moves.forEach(move => {
        switch (move.direction) {
          case "up":
            return this.grid.moveObject(0, move.steps, this.rickshaw)
          case "down":
            return this.grid.moveObject(0, -move.steps, this.rickshaw)
          case "left":
            return this.grid.moveObject(-move.steps, 0, this.rickshaw)
          case "right":
            return this.grid.moveObject(move.steps, 0, this.rickshaw)
        }
      })
    })
  }

  makeButtons = () => {
    return [{
      type: 'func_call_button',
      name: 'uper',
      numArgs: 1
    }, {
      type: 'func_call_button',
      name: 'neeche',
      numArgs: 1,
    }, {
      type: 'func_call_button',
      name: 'daen',
      numArgs: 1,
    }, {
      type: 'func_call_button',
      name: 'baen',
      numArgs: 1
    }, {
      type: 'number_button'
    }]
  }

  makeEditorData = () => {
    return [{
      type: 'blank',
      initFocused: true
    }]
  }
}


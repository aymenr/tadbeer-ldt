/* globals __DEV__ */
import Phaser from 'phaser'
import 'modeJS'
import Grid from '../components/Grid'
import { connect } from '../ui/main'
import CodeService from '../services/Code'
import Level1Wrap from '../wrappers/Level1'

export default class Level1 extends Phaser.State {
  init() {
    this.sizeX = 6
    this.sizeY = 6
  }

  create() {

    this.grid = new Grid(6, 6, this.game)

    var gameBoard = [
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['road1', 'road1', 'road1', 'road1', 'road1', 'road1'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ];

    //grid.display()

    this.grid.render(gameBoard)

    // //Initialize sprite
    this.rickshaw = this.game.add.sprite(0, 0, 'rickshaw1')
   	this.grid.placeObject(2,0,this.rickshaw)

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


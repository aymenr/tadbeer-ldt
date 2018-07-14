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
    this.grid = new Grid(6, 6, this.game)
    this.rickshawNames = ['rickshaw1', 'rickshaw2']
    this.rickshaws = []
  }

  create() {
    var gameBoard = [
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['road1', 'road1', 'road1', 'road1', 'road1', 'road1'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ];


    
    game.scale.setGameSize(this.grid.getWidth(),this.grid.getHeight())
    
    this.grid.render(gameBoard)
    this.renderRickshaws(this.rickshaws)
    this.hideRickshaws(this.rickshaws)

    this.rickshaw = this.rickshaws[1]
    this.placeRickshaw(this.rickshaw, this.grid, 0, 0, 0, 0.3)

    connect('content', this.makeButtons(), this.runCodeCb, this.makeEditorData())
  }


  hideRickshaws = (rickshaws) => {
  rickshaws.forEach(r => r.alpha = 0)
  }

  renderRickshaws = (rickshaws) => {
    this.rickshawNames.map(r => rickshaws.push(this.game.add.sprite(0,0, r)))
  }

  placeRickshaw = (rickshaw, grid, x, y, xOffset, yOffset) => {
    rickshaw.anchor.setTo(0, 0.25);
    grid.placeObject(x, y, rickshaw, xOffset, yOffset)
    rickshaw.alpha = 1
  }

  wrapCode = (code) => Level1Wrap + " " + code

  replaceRickshaw = (rickshaw, newRickshaw) => {
    rickshaw.alpha = 0
    newRickshaw.alpha = 1
    this.placeRickshaw(newRickshaw, this.grid, rickshaw.i, rickshaw.j, 0, 0.3)
  }

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
            this.grid.chainTween(() => {
              this.replaceRickshaw(this.rickshaw, this.rickshaws[0])
              this.rickshaw = this.rickshaws[0]
              return this.grid.moveObject(0, move.steps, this.rickshaw)
            })
            return
          case "down":
            return this.grid.moveObject(0, -move.steps, this.rickshaw)
          case "left":
            return this.grid.moveObject(-move.steps, 0, this.rickshaw)
          case "right":
            this.grid.chainTween(() => {
              this.replaceRickshaw(this.rickshaw, this.rickshaws[1])
              this.rickshaw = this.rickshaws[1]
              return this.grid.moveObject(move.steps, 0, this.rickshaw, 0, 0.3)
            })
            return
        }
        this.grid.chainTween(() => {
          this.game.tweens.removeAll()
        })
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
      name: 'neche',
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


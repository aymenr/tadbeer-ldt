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
        this.rickshaw;
    }

    create() {
        var gameBoard = [
            ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
            ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
            ['road1', 'road1', 'road1', 'goal-road', 'road1', 'road1'],
            ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
            ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
            ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ];



        game.scale.setGameSize(this.grid.getWidth(), this.grid.getHeight())

        this.grid.render(gameBoard)

        //setup rickshaw
        this.rickshaw = this.renderAndPlaceObject('rickshaw', 'up', this.grid, 2, 0, -0.2, 0.6, 1.3, 1.3)

        //setup passenger1
        let passenger = this.renderAndPlaceObject('passenger1', 'ride', this.grid, 1, 4, -0.4, 0.1, 0.7, 0.7)
        passenger.animations.add('ride', ['ride', 'no-ride'], 4, 60, true, false);
        passenger.animations.play('ride')


        connect('content', this.makeButtons(), this.runCodeCb, this.makeEditorData())
    }



    renderAndPlaceObject = (atlas, sprite, grid, x, y, xOffset, yOffset, scaleX, scaleY) => {
        let object = this.game.add.sprite(0, 0, atlas, sprite)

        object.alpha = 0
        grid.placeObject(x, y, object, xOffset, yOffset, scaleX, scaleY)

        object.alpha = 1
        return object
    }


    wrapCode = (code) => Level1Wrap + " " + code

    runCodeCb = (code) => {
        code = this.wrapCode(code) //wrap code in our wrapper
        let compiled = CodeService.compileCode(code)
        CodeService.runCode(compiled.code, (err, data) => {
            //handle this later
            if (err)
                return

            if (!data.answer)
                return
            let parsed = JSON.parse(data.answer)

            if (!parsed.moves)
                return

            parsed.moves.forEach(move => {
                switch (move.direction) {
                    case "up":
                        this.grid.chainTween(() => {
                            this.rickshaw.frameName = 'up'
                        
                            return this.grid.moveObject(0, move.steps, this.rickshaw)
                        })
                       return
                    case "down":
                        this.grid.chainTween(() => {
                            this.rickshaw.frameName = 'down'
                            return this.grid.moveObject(0, -move.steps, this.rickshaw)
                        })
                        return
                    case "left":
                        this.grid.chainTween(() => {
                            this.rickshaw.frameName = 'left'
                            return this.grid.moveObject(0, -move.steps, this.rickshaw)
                        })
                        return
                    case "right":
                        this.grid.chainTween(() => {
                            this.rickshaw.frameName = 'right'
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
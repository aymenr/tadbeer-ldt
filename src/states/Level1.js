/* globals __DEV__ */
import Phaser from 'phaser'
import 'modeJS'
import Grid from '../components/Grid'
import { connect } from '../ui/main'
import CodeService from '../services/Code'
import Level1Wrap from '../wrappers/Level1'
import async from '../../node_modules/async'

export default class Level1 extends Phaser.State {
    init() {
        this.sizeX = 3
        this.sizeY = 3
        this.grid = new Grid(3, 3, this.game)
        this.rickshaw;
        this.passenger;
        this.rickshawXOffset = -0.2;
        this.rickshawYOffset = 0.6;
        this.passengerXOffset = 0  
        this.passengerYOffset = 1
     }

    create() {
        var gameBoard = [
            ['goal-road2', 'grass', 'grass'],
            ['road2', 'grass', 'grass'],
            ['road2', 'grass', 'grass']

        ];


        game.physics.startSystem(Phaser.Physics.ARCADE)
        game.scale.setGameSize(this.grid.getWidth(), this.grid.getHeight())

        this.grid.render(gameBoard)

        //setup rickshaw
        this.rickshaw = this.renderAndPlaceObject('rickshaw', 'left', this.grid, 2, 0, this.rickshawXOffset, this.rickshawYOffset, 1.3, 1.3)



        //setup passenger1
        this.passenger = this.renderAndPlaceObject('passenger3', 'ride', this.grid, 0, 1, this.passengerXOffset, this.passengerYOffset, 1.1, 1.1)
        this.passenger.animations.add('ride', ['ride', 'walk03'], 4, 60, true, false);
        this.passenger.animations.add('walk', ['walk01', 'walk02', 'walk03'], 6, 60, false, false);

        this.passenger.animations.play('ride')



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
    moveRickshaw = (move, callback) => {
        let x = 0,
            y = 0

        switch (move.direction) {
            case "up":
                y = move.steps
                this.rickshaw.frameName = 'up'

                break;
            case "down":
                y = -move.steps
                this.rickshaw.frameName = 'down'

                break;
            case "left":
                x = -move.steps
                this.rickshaw.frameName='left'
                break

            case "right":
                x = move.steps
                this.rickshaw.frameName = 'right'

                break
        }

        this.grid.moveObject(x, y, this.rickshaw, callback, 1, this.rickshawXOffset, this.rickshawYOffset)

    }
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

            let that = this

            async.forEachSeries(parsed.moves, function(move, callback) {
                console.log(callback)
                that.moveRickshaw(move, callback)

            }, function() {
                console.log('ends')
                if (that.checkGoal()) {
                    that.gameOver()
                }

            });



        })
    }

    gameOver = () => {

        this.passenger.animations.play('walk', 6, true)
        var that = this
        this.grid.moveObject(0, -1, this.passenger, function() {


            that.grid.moveObject(-3, 0, that.rickshaw, function() {
                console.log("next level loading");
                that.state.start('Level2')
            }, 0, that.rickshawXOffset, that.rickshawYOffset)

        }, 0,this.passengerXOffset,this.passengerYOffset)

    }
    checkGoal = () => {


        let goalTile = this.grid.getGoalTile()
        return this.rickshaw.i == goalTile.i && this.rickshaw.j == goalTile.j

    }

    createNumButtons = () => {
        let numButtons = [];
        for (var i = 1; i <= 2; i++) {
            numButtons.push({ type: 'param_num', value: i })
        }
        return numButtons
    }
    makeButtons = () => {

        return [{
            type: 'func_call_button',
            name: 'uper',
            numArgs: 1
        }, {
            type: 'func_call_button',
            name: 'neechay',
            numArgs: 1,
        }, {
            type: 'func_call_button',
            name: 'daen',
            numArgs: 1,
        }, {
            type: 'func_call_button',
            name: 'baen',
            numArgs: 1
        }
        ].concat(this.createNumButtons())
    }

    makeEditorData = () => {
        return [{
                name: 'baen',
                numArgs: 1,
                type: 'func_call'
            },
            {
                type: 'blank',
                initFocused: false 
            }
        ]
    }
}
/* globals __DEV__ */
import Phaser from 'phaser'
import 'modeJS'
import Grid from '../components/Grid'
import { connect } from '../ui/main'
import CodeService from '../services/Code'
import Level1Wrap from '../wrappers/Level1'
import async from '../../node_modules/async'
import {deleteUI} from '../ui/main'
export default class Level1 extends Phaser.State {
    init() {
        this.sizeX = 4
        this.sizeY = 4
        this.grid = new Grid(4, 4, this.game)
        this.rickshaw;
        this.passenger;
        this.rickshawXOffset = -0.2;
        this.rickshawYOffset = 0.6;
        this.passengerXOffset = 0  
        this.passengerYOffset = 0.5
    }

    create() {
        var gameBoard = [
            ['grass', 'grass', 'goal-road2','grass'],
            ['grass', 'road-left-up', 'road-up-left','road2'],
            ['grass', 'road2', 'grass','road2'],
            ['grass', 'road-down-left', 'road1','road-up-left']

        ];

    

        game.physics.startSystem(Phaser.Physics.ARCADE)
        game.scale.setGameSize(this.grid.getWidth(), this.grid.getHeight())

        this.grid.render(gameBoard,'tiles')
        this.renderObjects() // i didnt put this in grid because need to offset each object and it isnt standardized

        connect('content', this.makeButtons(), this.runCodeCb, this.makeEditorData())
    }


    renderObjects =()=> {
        //setup rickshaw
        this.rickshaw = this.renderAndPlaceObject('rickshaw', 'left', this.grid, 2, 3, this.rickshawXOffset, this.rickshawYOffset, 1.3, 1.3)

        //setup passenger2
        this.passenger = this.renderAndPlaceObject('passenger1', 'ride', this.grid, 0, 3, this.passengerXOffset, this.passengerYOffset, 1, 1)
        this.passenger.animations.add('ride', ['ride', 'walk03'], 4, 60, true, false);
        this.passenger.animations.add('walk', ['walk01', 'walk02', 'walk03'], 6, 60, false, false);
        this.passenger.animations.play('ride');

        
        let naka= this.renderAndPlaceObject('', 'policeNaka', this.grid, 1, 3, 0.1, 0.3, 1, 1)
        let lampPost1= this.renderAndPlaceObject('', 'lamppost-1', this.grid, 2, 2, -0.3, 1.2, 1.5, 1.5)
        let lampPost2= this.renderAndPlaceObject('', 'lamppost-1', this.grid, 0, 1, -0.3, 1.2, 1.5, 1.5)
        let khamba1h= this.renderAndPlaceObject('', 'khamba1half', this.grid, 0, 0, -0.7, 1.22, 1.7, 1.7)
        let khamba2h= this.renderAndPlaceObject('', 'khamba2half', this.grid, 0, 1, -0.2, 0.74 , 1.7, 1.7)

        let khamba1bh= this.renderAndPlaceObject('', 'khamba1half', this.grid, 2, 0, -0.7, 1.38, 1.7, 1.7)
        let khamba2bh= this.renderAndPlaceObject('', 'khamba2half', this.grid, 3, 0, -1.2, 1.9 , 1.7, 1.7)


      
    }
    renderAndPlaceObject = (atlas, sprite, grid, x, y, xOffset, yOffset, scaleX, scaleY) => {
        let object;
        if (atlas =='') //loading from sprite instead of atlas
              object = this.game.add.sprite(0, 0, sprite)
        else  
            object = this.game.add.sprite(0, 0, atlas, sprite)

        object.alpha = 0
        grid.placeObject(x, y, object, xOffset, yOffset, scaleX, scaleY)

        object.alpha = 1
        return object
    }


    wrapCode = (code) => Level1Wrap + " " + code
    moveRickshaw = (move, callback) => {
        let x = 0,
            y = 0

        if(this.rickshaw.frameName === 'up'){
            
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
                    this.rickshaw.frameName = 'left'
                    break

                case "right":
                    x = move.steps
                    this.rickshaw.frameName = 'right'

                    break
            }
            
        } else if(this.rickshaw.frameName === 'down'){
            
            switch (move.direction) {
                case "up":
                    y = -move.steps
                    this.rickshaw.frameName = 'down'

                    break;
                case "down":
                    y = move.steps
                    this.rickshaw.frameName = 'up'

                    break;
                case "left":
                    x = move.steps
                    this.rickshaw.frameName = 'right'
                    break

                case "right":
                    x = -move.steps
                    this.rickshaw.frameName = 'left'

                    break
            }

        } else if(this.rickshaw.frameName === 'right'){
            
            switch (move.direction) {
                case "up":
                    x = move.steps
                    this.rickshaw.frameName = 'right'

                    break;
                case "down":
                    x = -move.steps
                    this.rickshaw.frameName = 'left'

                    break;
                case "left":
                    y = move.steps
                    this.rickshaw.frameName = 'up'
                    break

                case "right":
                    y = -move.steps
                    this.rickshaw.frameName = 'down'

                    break
            }

        } else if(this.rickshaw.frameName === 'left'){
            
            switch (move.direction) {
                case "up":
                    x = -move.steps
                    this.rickshaw.frameName = 'left'

                    break;
                case "down":
                    x = move.steps
                    this.rickshaw.frameName = 'right'

                    break;
                case "left":
                    y = -move.steps
                    this.rickshaw.frameName = 'down'
                    break

                case "right":
                    y = move.steps
                    this.rickshaw.frameName = 'up'

                    break
            }

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
        
                that.moveRickshaw(move, callback)

            }, function(err) {
                if (err){
                    console.log("there is an:",err)
                }
                else if (that.checkGoal()) {
                    that.gameOver()
                }

            });



        })
    }

    gameOver = () => {
        this.passenger.animations.play('walk', 6, true)
        var that = this
        this.grid.moveObject(1, 0, this.passenger, function() {


            that.grid.moveObject(-2, 0, that.rickshaw, function() {
                deleteUI('content')
                that.state.start('Level1')
            }, 0, this.rickshawXOffset, this.rickshawYOffset,true)

        }, 0,this.passengerXOffset,this.passengerYOffset)

    }
    checkGoal = () => {


        let goalTile = this.grid.getGoalTile()
        return this.rickshaw.i == goalTile.i && this.rickshaw.j == goalTile.j

    }

    createNumButtons = () => {
        let numButtons = [];
        for (var i = 1; i <= 3; i++) {
            numButtons.push({ type: 'param_num', value: i })
        }
        return numButtons
    }
    makeButtons = () => {

    var numButtons = this.createNumButtons()

        return [{
            type: 'func_call_button',
            name: 'uper',
            numArgs: 1
        }, {
            type: 'func_call_button',
            name: 'neechay',
            numArgs: 1,
        }, {
            type: 'param_num',
            value: 1,
        }, {
            type: 'param_num',
            value: 2,
        }, {
            type: 'func_call_button',
            name: 'daen',
            numArgs: 1,
        }, {
            type: 'func_call_button',
            name: 'baen',
            numArgs: 1
        }
        ].concat(numButtons.slice(2))
    }

    makeEditorData = () => {
        return [{
                name: 'uper',
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
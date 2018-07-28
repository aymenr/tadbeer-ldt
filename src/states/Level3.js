/* globals __DEV__ */
import Phaser from 'phaser'
import 'modeJS'
import Grid from '../components/Grid'
import { connect } from '../ui/main'
import Level1Wrap from '../wrappers/Level1'
import {deleteUI} from '../ui/main'
import {moveRickshawAux, renderAndPlaceObject, runCodeCbAux, makeButtons} from '../states/helper'


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

        connect('content', makeButtons(3), this.runCodeCb, this.makeEditorData(),this.makeInstructions())
    }


    renderObjects =()=> {
        //setup rickshaw
        this.rickshaw = renderAndPlaceObject('rickshaw', 'left', this.grid, 2, 3, this.rickshawXOffset, this.rickshawYOffset, 1.3, 1.3, this)
        this.rickshawSound = game.add.audio('rickshaw-sound');

        //setup passenger2
        this.passenger = renderAndPlaceObject('passenger1', 'ride', this.grid, 0, 3, this.passengerXOffset, this.passengerYOffset, 1, 1, this)
        this.passenger.animations.add('ride', ['ride', 'walk03'], 4, 60, true, false);
        this.passenger.animations.add('walk', ['walk01', 'walk02', 'walk03'], 6, 60, false, false);
        this.passenger.animations.play('ride');

        
        let naka= renderAndPlaceObject('', 'policeNaka', this.grid, 1, 3, 0.1, 0.3, 1, 1, this)
        let lampPost1= renderAndPlaceObject('', 'lamppost-1', this.grid, 2, 2, -0.3, 1.2, 1.5, 1.5, this)
        let lampPost2= renderAndPlaceObject('', 'lamppost-1', this.grid, 0, 1, -0.3, 1.2, 1.5, 1.5, this)
        let khamba1h= renderAndPlaceObject('', 'khamba1half', this.grid, 0, 0, -0.7, 1.22, 1.7, 1.7, this)
        let khamba2h= renderAndPlaceObject('', 'khamba2half', this.grid, 0, 1, -0.2, 0.74 , 1.7, 1.7,this)

        let khamba1bh= renderAndPlaceObject('', 'khamba1half', this.grid, 2, 0, -0.7, 1.38, 1.7, 1.7, this)
        let khamba2bh= renderAndPlaceObject('', 'khamba2half', this.grid, 3, 0, -1.2, 1.9 , 1.7, 1.7,this)


      
    }

    makeInstructions = () => { 
       
       return  "<ul><li>Bushra ke sawari us ke samne hay </li><li>Lekan ye samne police ka naka hay.</li><li>Ab kya kare gee Bushra? </li></ul>"
    }

    wrapCode = (code) => Level1Wrap + " " + code
    runCodeCb = (code) => {

        runCodeCbAux(code, 2, 3, 'left', this)
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
    
    makeEditorData = () => {
        return [ {
            type: 'blank',
            initFocused: true
        }]


    }
}
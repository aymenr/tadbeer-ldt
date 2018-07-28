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
        this.passengerYOffset = 1
    }

    create() {
        var gameBoard = [
            ['road1', 'road1', 'road1','road-left-down'],
            ['nehar-lower', 'nehar-lower', 'nehar-lower','road2'],
            ['grass', 'grass', 'grass','road2'],
            ['road1', 'goal-road', 'road1','road-up-left']

        ];

    

        game.physics.startSystem(Phaser.Physics.ARCADE)
        game.scale.setGameSize(this.grid.getWidth(), this.grid.getHeight())

        this.grid.render(gameBoard,'tiles')
        this.renderObjects() // i didnt put this in grid because need to offset each object and it isnt standardized

        connect('content', makeButtons(3), this.runCodeCb, this.makeEditorData(),this.makeInstructions())
    }


    renderObjects =()=> {
        //setup rickshaw
        this.rickshaw = renderAndPlaceObject('rickshaw', 'up', this.grid, 0, 0, this.rickshawXOffset, this.rickshawYOffset, 1.3, 1.3, this)
        this.rickshawSound = game.add.audio('rickshaw-sound');


        //setup passenger2
        this.passenger = renderAndPlaceObject('passenger2', 'ride', this.grid, 2, 1, this.passengerXOffset, this.passengerYOffset, 1.1, 1.1, this)
        this.passenger.animations.add('ride', ['ride', 'walk03'], 4, 60, true, false);
        this.passenger.animations.add('walk', ['walk01', 'walk02', 'walk03'], 6, 60, false, false);
        this.passenger.animations.play('ride');

    
        this.tree = renderAndPlaceObject('', 'tree', this.grid, 2, 2, -0.4, 1, 1.5, 1.5, this)
        this.bench = renderAndPlaceObject('', 'bench', this.grid, 2, 0, 0.1, 0.4, 1, 1, this)
        

      
    }


    makeInstructions = () => { 
       
       return  "<ul><li>Bushra ke sawari nehar kay doosri side pay hay. </li>  <li>Basheer ko nehar cross kar ke safed dabbay tak pohnchayen </li> </ul>"
    }

    wrapCode = (code) => Level1Wrap + " " + code
    runCodeCb = (code) => {
        runCodeCbAux(code, 0, 0, 'left', this)
    }

    gameOver = () => {
        this.passenger.animations.play('walk', 6, true)
        var that = this
        this.grid.moveObject(1, 0, this.passenger, function() {


            that.grid.moveObject(0, -6, that.rickshaw, function() {
                deleteUI('content')
                that.state.start('Level3')
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
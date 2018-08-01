/* globals __DEV__ */
import Phaser from 'phaser'
import 'modeJS'
import Grid from '../components/Grid'
import { connect } from '../ui/main'
import Level1Wrap from '../wrappers/Level1'
import React from 'react'
import ReturnWrap from '../wrappers/Return.js'
import async from '../../node_modules/async'

import {deleteUI} from '../ui/main'
import {showError } from '../ui/main'
import { toggleRunButton } from '../ui/main'
import {moveRickshawAux, turnRickshawAux, makeButtons,runCodeCbAux} from '../states/helper'


export default class Level3 extends Phaser.State {
    init() {
        this.sizeX = 4
        this.sizeY = 4
        this.grid = new Grid(4, 4, this.game)
        this.rickshaw;
        this.passenger;
        this.rickshawXOffset = 0.8;
        this.rickshawYOffset = -0.4;
        this.passengerXOffset = 0.8
        this.passengerYOffset = 0.1
        this.codeRunning = false;
        this.style = {
            container: {
            
                fontFamily:'apercuregular',
                paddingLeft:'15px',
                paddingRight:'15px'
            },
            h3: {
                fontFamily:'apercubold',
                color:'#7a46af'
            },
            color: {
                color: '#7a46af',
                fontWeight:'bold',
                fontFamily:'apercu_monoregular'
            }

        }
    }

    create() {
        var gameBoard = [
            ['grass', 'grass', 'goal-road2','grass'],
            ['grass', 'road-left-up', 'road-up-left','grass'],
            ['grass', 'road2', 'grass','road2'],
            ['grass', 'road-down-left', 'road1','road-up-left']

        ];

    

        game.physics.startSystem(Phaser.Physics.ARCADE)
        game.scale.setGameSize(this.grid.getWidth(), this.grid.getHeight() + 40)
        let background = game.add.tileSprite(0, 0, this.grid.getWidth(), this.grid.getWidth(), 'background3');
        
        this.grid.render(gameBoard,1,-1)
        this.renderObjects() // i didnt put this in grid because need to offset each object and it isnt standardized

        connect('content', this.makeButtons(), this.runCodeCb, this.makeEditorData(),this.makeInstructions())
    }

            makeButtons = () => {


    return [{
            type: 'func_call_button',
            name: 'agay',
            numArgs: 1
        },
        {
            type: 'func_call_button',
            name: 'daenMuro',
            numArgs: 0,
        },
        {
            type: 'param_num',
            value: 1,
        }, {
            type: 'param_num',
            value: 2,
        },
         {
            type: 'param_num',
            value: 3,
        },
         {
            type: 'func_call_button',
            name: 'baenMuro',
            numArgs: 0
        }
    ]
}

    renderObjects =()=> {
        //setup rickshaw
        let gutter= this.grid.renderAndPlaceObject('', 'gutter', this.grid, 1, 3, 1.4, -0.9, 1.1,1.1, this,40)
        
        this.rickshaw = this.grid.renderAndPlaceObject('rickshaw', 'right', this.grid, 2, 3, this.rickshawXOffset, this.rickshawYOffset, 1.2, 1.2, this)
        this.rickshawSound = game.add.audio('rickshaw-sound');


        //setup passenger2
        this.passenger = this.grid.renderAndPlaceObject('passenger2', 'ride', this.grid, 0, 3, this.passengerXOffset, this.passengerYOffset, 1, 1, this,40)
        this.passenger.animations.add('ride', ['ride', 'walk01'], 4, 60, true, false);
        this.passenger.animations.add('walk', ['walk01', 'walk02', 'walk03'], 6, 60, false, false);
        this.passenger.animations.play('ride');

        // let naka= this.grid.renderAndPlaceObject('', 'policeNaka', this.grid, 1, 3, 0.4, 0.2, 1, 1, this,40)
        let lampPost1= this.grid.renderAndPlaceObject('', 'lamppost-1', this.grid, 2, 2, -0.3,1.1, 1.5, 1.5, this,40)
        let lampPost2= this.grid.renderAndPlaceObject('', 'lamppost-1', this.grid, 0, 1, -0.3, 1.1, 1.5, 1.5, this,40)
        let khamba1= this.grid.renderAndPlaceObject('', 'khamba1', this.grid, 0, 0, -1, 1.2, 1.8, 1.7, this,40)
        let khamba2= this.grid.renderAndPlaceObject('', 'khamba1', this.grid, 1, 0, -1, 1.2, 1.7, 1.7, this,40)
         let khamba3= this.grid.renderAndPlaceObject('', 'khamba1', this.grid, 2, 0, -1, 1.2, 1.7, 1.7, this,40)
        
        
        let khamba4= this.grid.renderAndPlaceObject('', 'khamba1', this.grid, 3, 0, -1, 1.2, 1.7, 1.7, this,40)
        


        //let khamba2h= this.grid.renderAndPlaceObject('', 'khamba2half', this.grid, 0, 1, -0.2, 0.74 , 1.7, 1.7,this)

        // let khamba1bh= this.grid.renderAndPlaceObject('', 'khamba1half', this.grid, 2, 0, -0.7, 1.38, 1.7, 1.7, this)
        // let khamba2bh= this.grid.renderAndPlaceObject('', 'khamba2half', this.grid, 3, 0, -1.2, 1.9 , 1.7, 1.7,this)


      
    }


    makeInstructions = () => { 
       let instructions = ( 

        <div style = {this.style.container}>
        <h3 style = {this.style.h3}> Kya karna hay? </h3> 
        <p> Bushra kee sawaari us kay samnay hay. </p>
        <p> Lekan ud-har gutter khula para hay. Ab kya karay gee Bushra? </p>
        </div>
        )
        
    return instructions
    }


    wrapCode = (code) => Level1Wrap + " " + code + " " + ReturnWrap
  


    moveRickshaw = (move, callback) => {

        moveRickshawAux(move, callback, this)

    }
     turnRickshaw = (move, callback) => {

        turnRickshawAux(move, callback, this)
    }

    runCodeCb = (code) => {

        runCodeCbAux(code, 2, 3, 'right', this)

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

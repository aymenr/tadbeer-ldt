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


export default class Level4 extends Phaser.State {
    init() {
        this.sizeX = 4
        this.sizeY = 4
        this.grid = new Grid(4, 4, this.game)
        this.rickshaw;
        this.passenger;
        this.rickshawXOffset = 0.6;
        this.rickshawYOffset = -0.4;
        this.passengerXOffset = 0.8
        this.passengerYOffset = 0.1
        this.codeRunning = false;
        this.hornPlayed = false
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
            ['grass', 'grass', 'road2','grass'],
            ['grass', 'grass', 'road2','grass'],
            ['road1', 'road1', 'road-up-left','grass']

        ];

    

        game.physics.startSystem(Phaser.Physics.ARCADE)
        game.scale.setGameSize(this.grid.getWidth(), this.grid.getHeight() + 40)
        let background = game.add.tileSprite(0, 0, this.grid.getWidth(), this.grid.getWidth(), 'background4');
        
        this.grid.render(gameBoard,1,-1)
        this.renderObjects() // i didnt put this in grid because need to offset each object and it isnt standardized

        connect('content', this.makeButtons(), this.runCodeCb, this.makeEditorData(),this.makeInstructions())
    }

            makeButtons = () => {


    return {
        buttons:[{
            type: 'func_call_button',
            name: 'agayJao',
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
        },
         {
            type: 'func_call_button',
            name: 'hornMaro',
            numArgs: 0
        }
    ],
    open: {
          popover: {
            title:'dabao',
            open:false,
            arrow:true,
            theme:'light',
            sticky:true
          },
        },
        close: {
          popover: {
            title:'dabao',
            open:false,
            arrow:true,
            theme:'light',
            sticky:true
          }
        }
    }
}

    renderObjects =()=> {
        //setup rickshaw
      


        let building1= this.grid.renderAndPlaceObject('', 'building1', this.grid, 0, 3, 0.3,0, 1.3, 1.3, this,40)
        let building2= this.grid.renderAndPlaceObject('', 'building2', this.grid, 1, 3, 0.3,0, 1.3, 1.3, this,40)
        let building3= this.grid.renderAndPlaceObject('', 'building2', this.grid, 2, 3, 0.3,0, 1.3, 1.3, this,40)
        let building4= this.grid.renderAndPlaceObject('', 'building2', this.grid, 3, 3, 0.3,0, 1.3, 1.3, this,40)

        this.rickshaw = this.grid.renderAndPlaceObject('rickshaw', 'up', this.grid, 3, 0, this.rickshawXOffset, this.rickshawYOffset, 1.3, 1.3, this)
        this.rickshawSound = game.add.audio('rickshaw-sound');
        this.rickshawHornSound = game.add.audio('rickshaw-horn');

      
    }


    makeInstructions = () => { 
       let instructions = ( 

        <div style = {this.style.container}>
        <h3 style = {this.style.h3}> Kya karna hay? </h3> 
        <p> Konay pay brown ghar ke samne ja ke horn maren ta kay sawari ghar say niklay. </p>
       
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

        runCodeCbAux(code, 3, 0, 'up', this,this.goalCb)

    }

    goalCb = (level)=> {
        let goalTile = level.grid.getGoalTile()
        if (level.rickshaw.i == goalTile.i && level.rickshaw.j == goalTile.j) {
            if (level.hornPlayed == true) { 
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    gameOver = () => {
        
        this.passenger = this.grid.renderAndPlaceObject('passenger2', 'walk01', this.grid, 0, 3, this.passengerXOffset, this.passengerYOffset, 1.1, 1.1, this)
        this.passenger.animations.add('walk', ['walk01', 'walk02', 'walk03'], 6, 60, false, false);
        this.passenger.animations.play('walk');

        var that = this
        this.grid.moveObject(0, -1, this.passenger, function() {


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

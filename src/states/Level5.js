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
        this.songChanged = false
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
            ['grass', 'grass', 'grass','grass'],
            ['grass', 'grass', 'grass','grass'],
            ['grass', 'grass', 'grass','grass'],
            ['grass', 'grass', 'grass','grass']

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
            name: 'ganaBadlo',
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
         let tree=  this.grid.renderAndPlaceObject('', 'tree', this.grid, 0, 3, 1,-0.3, 0.6, 0.6, this,40)
        
        let tree2=  this.grid.renderAndPlaceObject('', 'tree', this.grid, 1, 3, 1,-0.3, 0.6, 0.6, this,40)
        let tree3=  this.grid.renderAndPlaceObject('', 'tree', this.grid, 2, 3, 1,-0.3, 0.6, 0.6, this,40)
        let tree4=  this.grid.renderAndPlaceObject('', 'tree', this.grid, 3, 3, 1,-0.3, 0.6, 0.6, this,40)
        
        let building3= this.grid.renderAndPlaceObject('', 'building6', this.grid, 0, 2, 0.7,-0.4, 1, 1, this,40)
       
        let building2= this.grid.renderAndPlaceObject('', 'building5', this.grid, 0, 1, 0.5,-0.2, 1.2, 1.2, this,40)
       
        let building1= this.grid.renderAndPlaceObject('', 'building4', this.grid, 0, 0, 0.7,-0.4, 1, 1, this,40)
        
        
        this.rickshaw = this.grid.renderAndPlaceObject('rickshaw', 'up', this.grid, 3, 0, this.rickshawXOffset, this.rickshawYOffset, 1.3, 1.3, this)
        this.rickshawSound = game.add.audio('rickshaw-sound');
        this.rickshawHornSound = game.add.audio('rickshaw-horn');
        this.radioSound = game.add.audio('radio-noor');
        this.newSound = game.add.audio('somewhat');
        this.radioSound.volume =1
        this.radioSound.play()

        this.passenger = this.grid.renderAndPlaceObject('passenger1', 'walk01', this.grid, 1, 0, this.passengerXOffset, this.passengerYOffset, 1.1, 1.1, this)

        this.passenger.animations.add('walk', ['walk01', 'walk02', 'walk03'], 6, 60, false, false);
        this.passenger.animations.play('ride');

      
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
        if (this.songChanged ==true && level.rickshaw.i == 0 && level.rickshaw.j == 3)
            return true
        else
            return false
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

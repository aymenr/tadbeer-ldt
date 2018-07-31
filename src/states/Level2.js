/* globals __DEV__ */
import Phaser from 'phaser'
import 'modeJS'
import Grid from '../components/Grid'
import { connect } from '../ui/main'
import { toggleRunButton } from '../ui/main'
import CodeService from '../services/Code'
import Level1Wrap from '../wrappers/Level1'
import ReturnWrap from '../wrappers/Return.js'
import async from '../../node_modules/async'
import { deleteUI } from '../ui/main'
import { showError } from '../ui/main'
import React from 'react'
import { moveRickshawAux, turnRickshawAux, makeButtons,runCodeCbAux } from '../states/helper'



export default class Level2 extends Phaser.State {
    init() {
        this.sizeX = 4
        this.sizeY = 4
        this.grid = new Grid(4, 4, this.game)
        this.rickshaw;
        this.passenger;
        this.rickshawXOffset = -0.2;
        this.rickshawYOffset = 0.6
        this.passengerXOffset = -0.2
        this.passengerYOffset = 1
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
            ['road1', 'road1', 'road1', 'road-left-down'],
            ['nehar-lower', 'nehar-lower', 'nehar-lower', 'road2'],
            ['grass', 'grass', 'grass', 'road2'],
            ['road1', 'goal-road', 'road1', 'road-up-left']

        ];



        game.physics.startSystem(Phaser.Physics.ARCADE)
        game.scale.setGameSize(this.grid.getWidth(), this.grid.getHeight())
        let background = game.add.tileSprite(0, 0, this.grid.getWidth(), this.grid.getWidth(), 'background2');

        this.grid.render(gameBoard)
        this.renderObjects() // i didnt put this in grid because need to offset each object and it isnt standardized

        connect('content', makeButtons(3), this.runCodeCb, this.makeEditorData(), this.makeInstructions())
    }


    renderObjects = () => {
        //setup rickshaw

        this.rickshaw = this.grid.renderAndPlaceObject('rickshaw', 'up', this.grid, 0, 0, this.rickshawXOffset, this.rickshawYOffset, 1.2, 1.2, this)

        //setup passenger2
        this.passenger = this.grid.renderAndPlaceObject('passenger1', 'ride', this.grid, 2, 1, this.passengerXOffset, this.passengerYOffset, 1.1, 1.1, this)
        this.passenger.animations.add('ride', ['ride', 'walk01'], 4, 60, true, false);
        this.passenger.animations.add('walk', ['walk01', 'walk02', 'walk03'], 6, 60, false, false);
        this.passenger.animations.play('ride');


        this.tree = this.grid.renderAndPlaceObject('', 'tree', this.grid, 2, 2, -0.4, 1, 1, 1, this)
        this.bench = this.grid.renderAndPlaceObject('', 'bench', this.grid, 2, 0, 0.1, 0.4, 1, 1, this)
        this.rickshawSound = game.add.audio('rickshaw-sound');

    }


    makeInstructions = () => {
        let instructions = ( 

        <div style = {this.style.container}>
            <h3 style = {this.style.h3}> Kya karna hay? </h3> 
            <p> Bushra kee sawari nehar kay doosri side pay hay. </p>
      
                <li> <span style = {this.style.color}>agay()</span>kay brackets kay andar number batata hay kay Basheer nay kitnay dabbay agay jana hay </li>
                
            
            <p> Basheer ko nehar cross kar ke safed dabbay tak pohnchayen </p>
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
        runCodeCbAux(code, 0, 0, 'left', this)
    }

    gameOver = () => {
        this.passenger.animations.play('walk', 6, true)
        var that = this
        this.grid.moveObject(1, 0, this.passenger, function() {


            that.grid.moveObject(0, -6, that.rickshaw, function() {
                deleteUI('content')
                that.state.start('Level3')
            }, 0, this.rickshawXOffset, this.rickshawYOffset, true)

        }, 0, this.passengerXOffset, this.passengerYOffset)

    }



    makeEditorData = () => {
        return [{
            type: 'blank',
            initFocused: true
        }]


    }
}

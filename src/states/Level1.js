/* globals __DEV__ */
import Phaser from 'phaser'
import 'modeJS'
import React from 'react'
import Grid from '../components/Grid'
import { connect } from '../ui/main'
import { deleteUI } from '../ui/main'
import { showError } from '../ui/main'
import CodeService from '../services/Code'
import Level1Wrap from '../wrappers/Level1'
import ReturnWrap from '../wrappers/Return.js'
import async from '../../node_modules/async'
import { toggleRunButton } from '../ui/main'
import { moveRickshawAux, turnRickshawAux, makeButtons,runCodeCbAux } from '../states/helper'




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
        this.codeRunning = false;
    }

    create() {
        var gameBoard = [
            ['goal-road2', 'grass', 'grass'],
            ['road2', 'grass', 'grass'],
            ['road2', 'grass', 'grass']

        ];
        console.log('width:', this.grid.getWidth(), 'height:', this.grid.getHeight())
        let background = game.add.tileSprite(0, 0, this.grid.getWidth(), this.grid.getWidth(), 'background1');
        game.physics.startSystem(Phaser.Physics.ARCADE)
        game.scale.setGameSize(this.grid.getWidth(), this.grid.getHeight())

        this.grid.render(gameBoard)

        //setup rickshaw

        // this.rickshaw = this.grid.renderAndPlaceObject('rickshaw', 'up', this.grid, 2, 0, this.rickshawXOffset, this.rickshawYOffset, 1.3, 1.3, this)
        // this.rickshawSound = game.add.audio('rickshaw-sound');


        // //setup passenger1
        // this.passenger = this.grid.renderAndPlaceObject('passenger3', 'ride', this.grid, 0, 1, this.passengerXOffset, this.passengerYOffset, 1.1, 1.1, this)
        // this.passenger.animations.add('ride', ['ride', 'walk03'], 4, 60, true, false);
        // this.passenger.animations.add('walk', ['walk01', 'walk02', 'walk03'], 6, 60, false, false);

        // this.passenger.animations.play('ride')


        connect('content', makeButtons(2), this.runCodeCb, this.makeEditorData(), this.makeInstructions())
    }


    makeInstructions = () => {

        return "<ul> <li>Bushra ke sawari us ka intezar kar rahe hay </li> <li>agay(), peechay(), daen(), baen() Basheer ko us ka rukh batate hay </li> <li>agay(3) batatay hayn kay Basheer 3 dabbay agay jaye</li> <li>Basheer ko safed dabbay tak pohnchayen</li> </ul>"
    }


    wrapCode = (code) => Level1Wrap + " " + code

    moveRickshaw = (move, callback) => {
        moveRickshawAux(move, callback, this)
    }
    turnRickshaw = (move, callback) => {

        turnRickshawAux(move, callback, this)
    }

    runCodeCb = (code) => {
        runCodeCbAux(code, 2, 0, 'left', this)

    }

    gameOver = () => {

        this.passenger.animations.play('walk', 6, true)
        var that = this
        this.grid.moveObject(0, -1, this.passenger, function() {


            that.grid.moveObject(-3, 0, that.rickshaw, function() {
                deleteUI('content')
                that.state.start('Level2')
            }, 0, that.rickshawXOffset, that.rickshawYOffset, true)

        }, 0, this.passengerXOffset, this.passengerYOffset)
    }


    makeEditorData = () => {
        return [{

            type: 'func_call_button',
            name: 'agay',
            numArgs: 1
        }, {
            type: 'func_call_button',
            name: 'peechay',
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
            type: 'func_call',
            
            args: [{
                type: 'param_nums',
                value: 1,
                initFocused: true,
            }],
            name: 'agay'
        }

        ]
    }
}

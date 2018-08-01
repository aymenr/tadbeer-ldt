/* globals __DEV__ */
import Phaser from 'phaser'
import 'modeJS'
import React from 'react'
import Grid from '../components/Grid'
import { connect, update } from '../ui/main'
import { deleteUI } from '../ui/main'
import { showError } from '../ui/main'
import CodeService from '../services/Code'
import Level1Wrap from '../wrappers/Level1'
import ReturnWrap from '../wrappers/Return.js'
import async from '../../node_modules/async'
import { toggleRunButton } from '../ui/main'
import { moveRickshawAux, turnRickshawAux, makeButtons,runCodeCbAux } from '../states/helper'
import  '~/assets/fonts/stylesheet.css';



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
            },
            div2: {
                marginTop:'10px',
                marginBottom:'10px'
            },
            li: {
                marginBottom:'5px'
            },
            div1: {
                marginBottom:'10px'
            }
        }

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

        this.rickshaw = this.grid.renderAndPlaceObject('rickshaw', 'left', this.grid, 2, 0, this.rickshawXOffset, this.rickshawYOffset, 1.2, 1.2, this)
        this.rickshawSound = game.add.audio('rickshaw-sound');


        //setup passenger1
        this.passenger = this.grid.renderAndPlaceObject('passenger3', 'ride', this.grid, 0, 1, this.passengerXOffset, this.passengerYOffset, 1,1, this)
        this.passenger.animations.add('ride', ['ride', 'walk01'], 4, 60, true, false);
        this.passenger.animations.add('walk', ['walk01', 'walk02', 'walk03'], 6, 60, false, false);

        this.passenger.animations.play('ride')



        connect('content', this.makeButtons(), this.runCodeCb, this.makeEditorData(),this.makeInstructions(),this.tutorial())

        
		// setTimeout(() => {
		// 	let buttons =  this.makeButtons()
  //           buttons.open.popover.open = true
		//   update('content', buttons, this.runCodeCb, this.makeEditorData(),this.makeInstructions())
		// }, 2000) 
    }
	
    makeInstructions = () => { 


        let instructions = ( 

        <div style = {this.style.container}>
        <h3 style = {this.style.h3}> Kya karna hay? </h3> 
        <div style ={this.style.div1} >
         <span style={this.style.color}> agayJao(),daenMuro(),baenMuro()</span>ko <span style={this.style.color}>functions</span> kehte hayn. Sub ka apna apna kaam hay </div>
       
            <li style={this.style.li}><span style = {this.style.color}>agayJao(2)</span> Basheer ko <span style ={this.style.color}> 2 dabbay agay </span>janay ko kehta hay </li>
            <li style={this.style.li}><span style ={this.style.color}>daenMuro() </span> Basheer ko siraf <span style ={this.style.color}>daen morta </span>hay. Is kay brackets may kuch nahi jata </li>
       
            <div style ={this.style.div2}> Bushra kee sawari inte-zaar kar rahee hay. Basheer ko safed dabbay tak pohnchay-en </div> 
        
        </div>
        )

        
        return instructions

    }

    tutorial = () => {
        
        return {'level':1,
         'pointOrder': [
         {type:'func_call_button',name:'agayJao'},
         {type:'param_num',value:1},
         {type:'header',name:'chalao'}
         ]

    }
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


    makeButtons = () => {



      return {
        buttons: [{
            type: 'func_call_button',
            name: 'agayJao',
            numArgs: 1,
			popover: {
				title: 'dabao',
				open: true,
                arrow:true,
                theme:'light',
                sticky:true,
                hideOnClick: true
			}
        }, {

            type: 'func_call_button',
            name: 'daenMuro',
            numArgs: 0,
        },
         {

            type: 'func_call_button',
            name: 'baenMuro',
            numArgs: 0,
        },
        {
            type: 'param_num',
            value: 1,
            popover: {
                title:'dabao',
                open:false,
                arrow:true,
                theme:'light',
                sticky:true
            }
        }, {
            type: 'param_num',
            value: 2,
        }],
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

      makeEditorData = () => {
        return [{
            type: 'func_call',
            
            args: [{
                type: 'param_nums',
                value: 1
            }],
            name: 'agayJao'
        },
        {
            type:'blank',
            initFocused:true
        }

        ]
    }
    
}

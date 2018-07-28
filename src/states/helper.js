import {showError } from '../ui/main'
import CodeService from '../services/Code'
import async from '../../node_modules/async'

export function moveRickshawAux(move, callback, level) {

        let x = 0,
            y = 0

        if(level.rickshaw.frameName === 'up'){
            
            switch (move.direction) {
                case "up":
                    y = move.steps
                    level.rickshaw.frameName = 'up'

                    break;
                case "down":
                    y = -move.steps
                    level.rickshaw.frameName = 'down'

                    break;
                case "left":
                    x = -move.steps
                    level.rickshaw.frameName = 'left'
                    break

                case "right":
                    x = move.steps
                    level.rickshaw.frameName = 'right'

                    break
            }
            
        } else if(level.rickshaw.frameName === 'down'){
            
            switch (move.direction) {
                case "up":
                    y = -move.steps
                    level.rickshaw.frameName = 'down'

                    break;
                case "down":
                    y = move.steps
                    level.rickshaw.frameName = 'up'

                    break;
                case "left":
                    x = move.steps
                    level.rickshaw.frameName = 'right'
                    break

                case "right":
                    x = -move.steps
                    level.rickshaw.frameName = 'left'

                    break
            }

        } else if(level.rickshaw.frameName === 'right'){
            
            switch (move.direction) {
                case "up":
                    x = move.steps
                    level.rickshaw.frameName = 'right'

                    break;
                case "down":
                    x = -move.steps
                    level.rickshaw.frameName = 'left'

                    break;
                case "left":
                    y = move.steps
                    level.rickshaw.frameName = 'up'
                    break

                case "right":
                    y = -move.steps
                    level.rickshaw.frameName = 'down'

                    break
            }

        } else if(level.rickshaw.frameName === 'left'){
            
            switch (move.direction) {
                case "up":
                    x = -move.steps
                    level.rickshaw.frameName = 'left'

                    break;
                case "down":
                    x = move.steps
                    level.rickshaw.frameName = 'right'

                    break;
                case "left":
                    y = -move.steps
                    level.rickshaw.frameName = 'down'
                    break

                case "right":
                    y = move.steps
                    level.rickshaw.frameName = 'up'

                    break
            }

        }

        level.grid.moveObject(x, y, level.rickshaw, callback, 1, level.rickshawXOffset, level.rickshawYOffset);
    }

export function renderAndPlaceObject(atlas, sprite, grid, x, y, xOffset, yOffset, scaleX, scaleY, level) {
        let object = level.game.add.sprite(0, 0, atlas, sprite)

        object.alpha = 0
        grid.placeObject(x, y, object, xOffset, yOffset, scaleX, scaleY)

        object.alpha = 1
        return object
    }
//Nums are number of numerical buttons
export function makeButtons(nums) {

    let numButtons = [];
    for (var i = 1; i <= nums; i++) {
        numButtons.push({ type: 'param_num', value: i })
    }


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

export function runCodeCbAux(code, x, y, orientation, level){

        level.rickshawSound.play()
        level.rickshawSound.volume = 1
        showError('')
        code = level.wrapCode(code) //wrap code in our wrapper
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

            let that = level

            async.forEachSeries(parsed.moves, function(move, callback) {

                moveRickshawAux(move, callback, that)

            }, function(err) {

                if (err) {

                    showError(err)

                    that.grid.resetPosition(that.rickshaw,{'x':x,'y':y},that.rickshawXOffset,that.rickshawYOffset,orientation)
                }

                if (!err && checkGoal(that)) {
                    that.gameOver()
                } else {
                        showError('Basheer sawaree tak na pohanch saka. Dobara try karen')
                        that.grid.resetPosition(that.rickshaw,{'x':x,'y':y},that.rickshawXOffset,that.rickshawYOffset,orientation)
                
                }
                that.rickshawSound.fadeOut(1000)

            });



        })

}

function checkGoal (level) {


        let goalTile = level.grid.getGoalTile()
        return level.rickshaw.i == goalTile.i && level.rickshaw.j == goalTile.j

    }

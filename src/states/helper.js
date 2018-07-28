
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


        level.grid.moveObject(x, y, level.rickshaw, callback, 1, level.rickshawXOffset, level.rickshawYOffset)

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


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
            }

        }


        level.grid.moveObject(x, y, level.rickshaw, callback, 1, level.rickshawXOffset, level.rickshawYOffset)

    }
export function turnRickshawAux(move,callback,level) {


    if (move.direction =="right"){
        switch (level.rickshaw.frameName) {
            case "up":
                level.rickshaw.frameName = "right"
                break
            case "down":
                level.rickshaw.frameName = "left"
                break
            case "left":
                level.rickshaw.frameName = "up"
                break
            case "right":
                level.rickshaw.frameName = "down"
                break
        }
    }else if (move.direction =='left') {
        switch (level.rickshaw.frameName) {
            case "up":
                level.rickshaw.frameName = "left"
                break
            case "down":
                level.rickshaw.frameName = "right"
                break
            case "left":
                level.rickshaw.frameName = "down"
                break
            case "right":
                level.rickshaw.frameName = "up"
                break
        }
    }
    callback()
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
        },  {
            type: 'func_call_button',
            name: 'baenMuro',
            numArgs: 0
        }
        ].concat(numButtons.slice(2))
    }

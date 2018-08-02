import { showError } from '../ui/main'
import CodeService from '../services/Code'
import async from '../../node_modules/async'
import { toggleRunButton } from '../ui/main'
export function moveRickshawAux(move, callback, level) {

    let x = 0,
        y = 0

    if (level.rickshaw.frameName === 'up') {

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

    } else if (level.rickshaw.frameName === 'down') {

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

    } else if (level.rickshaw.frameName === 'right') {

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

    } else if (level.rickshaw.frameName === 'left') {

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

    level.grid.moveObject(x, y, level.rickshaw, callback, 1, level.rickshawXOffset, level.rickshawYOffset);
}
export function turnRickshawAux(move, callback, level) {


    if (move.direction == "right") {
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
    } else if (move.direction == 'left') {
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
        }, {
            type: 'func_call_button',
            name: 'baenMuro',
            numArgs: 0
        },
        {
             type: 'if_button'
        }
    ]
}

export function runCodeCbAux(code, x, y, orientation, level, running) {
    if (level.codeRunning == true) {
        console.log('codes running');
        return
    }
    level.codeRunning = true
    toggleRunButton(false)

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

            if (move.type == "move")
                that.moveRickshaw(move, callback)
            else if (move.type == "turn")
                that.turnRickshaw(move, callback)

        }, function(err) {

            if (err) {

                showError(err)

                that.grid.resetPosition(that.rickshaw, { 'x': x, 'y': y }, that.rickshawXOffset, that.rickshawYOffset, orientation)
            } else {

            if (!err && checkGoal(that)) {
                that.gameOver()
            } else {
                showError('Basheer sawaree tak na pohanch saka. Dobara try karen')
                that.grid.resetPosition(that.rickshaw, { 'x': x, 'y': y }, that.rickshawXOffset, that.rickshawYOffset, orientation)

            }
            }
            that.rickshawSound.fadeOut(1000)
            that.codeRunning = false;
            toggleRunButton(true)

        });



    })

}

function checkGoal(level) {


    let goalTile = level.grid.getGoalTile()
    return level.rickshaw.i == goalTile.i && level.rickshaw.j == goalTile.j

}
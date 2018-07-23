const returnVal = {
  moves: []
}

const validations = (number) => {
  if (!Number.isInteger(number))
    throw "Invalid argument"
  //out of bounds move checks here
}

const moveDirection = (direction, steps) => {
  return {
    type: "move",
    direction: direction,
    steps: steps
  }
}

const generic = (number, direction) => {
  validations(number)
  returnVal.moves.push(moveDirection(direction, number)) 
  return returnVal// return is necessary for eval, as it takes last return statemetn
}

const agay = (number) => generic(number, "up")
const peechay = (number) => generic(number, "down")
const daen = (number) => generic(number, "right")
const baen = (number) => generic(number, "left")

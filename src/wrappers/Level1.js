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

const turnDirection = (direction) => {
  return {
    type: "turn",
    direction: direction,
  }
}



const generic = (number, direction) => {
  validations(number)
  returnVal.moves.push(moveDirection(direction, number)) 
  return returnVal// return is necessary for eval, as it takes last return statemetn
}

const turn= (direction) => {
  returnVal.moves.push(turnDirection(direction)) 
  return returnVal// return is necessary for eval, as it takes last return statemetn
}
const horn = ()=> {
  returnVal.moves.push({type:"horn"})

  return returnVal
}

const agayJao = (number) => generic(number, "up")
const peechay = (number) => generic(number, "down")
const daenMuro = () => turn("right")
const baenMuro = () => turn("left")
const hornMaro = () => horn()

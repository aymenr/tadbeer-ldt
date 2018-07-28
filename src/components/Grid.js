import Phaser from 'phaser'
export default class Grid extends Phaser.Group {
    constructor(cols, rows, game) {
        super(game);


        //initialize 2D arrays
        var tileArray = new Array(rows);
        for (var i = 0; i < rows; i++) {
            tileArray[i] = new Array(cols);
        }

        var objectArray = new Array(rows);
        for (var i = 0; i < rows; i++) {
            objectArray[i] = new Array(cols);
        }


        //promote to a class variable
        this.tileArray = tileArray
        this.objectArray = objectArray
        this.rows = rows
        this.cols = cols
        this.callback;
        this.goalTile;
        this.error = false
        //Scale for different screen sizes
        this.scaleRatio = window.innerWidth / (cols * this.game.cache.getImage('grass').width)

        this.tileHeight = this.game.cache.getImage('grass').height * 0.76 * this.scaleRatio
        this.tileWidth = this.game.cache.getImage('grass').width * this.scaleRatio
        this.offset = 0 //hackish solution for now
        this.offset = Math.abs(this.convert(0, this.cols - 1).y)
        this.tiles = new Array(this.rows)
        for (let i = 0; i < this.rows; i++)
            this.tiles[i] = new Array(this.cols)

        for (var i = 0; i < rows; i++) {
            for (var j = this.cols - 1; j >= 0; j--) {
                tileArray[i][j] = 'grass'
            }
        }
    }


    render(tArray) { // why is this storing strings, should be storing the sprites! fix

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.tileArray[i][j] = tArray[i][j]
            }
        }

        var x, y, tile
        for (let i = 0; i < this.rows; i++) {
            for (let j = this.cols - 1; j >= 0; j--) {

                let {
                    x,
                    y
                } = this.convert(i, j)



                tile = this.game.add.sprite(x, y, this.tileArray[i][j])
                tile.i = i
                tile.j = j

                this.tiles[i][j] = tile

                tile.scale.setTo(this.scaleRatio, this.scaleRatio);

                //set goaltile
                if (this.tileArray[i][j].includes('goal-road')) {

                    this.goalTile = this.tiles[i][j]

                }
            }
        }

    }


    convert(i, j) {
        return {
            x: (j * this.tileWidth / 2) + (i * this.tileWidth / 2),
            y: (i * this.tileHeight / 2) - (j * this.tileHeight / 2) + this.offset
        }
    }

    getGoalTile() {
        return this.goalTile
    }
    //approximate method
    getHeight() {
        return Math.abs(this.convert(0, this.cols).y - this.convert(this.rows + 1, 0).y)
    }

    //approximate method
    getWidth() {
        return Math.abs(this.convert(0, 0).x - this.convert(this.rows, this.cols).x)
    }

    createTween(fade, obj, coordinates, time) {
        if (fade == 1) {
            return this.game.add.tween(obj, this.game, this.game.tweens).to({
                x: coordinates.x,
                y: coordinates.y
            }, time)
        } else {
            return this.game.add.tween(obj, this.game, this.game.tweens).to({
                x: coordinates.x,
                y: coordinates.y,
                alpha: 0
            }, time)
        }
    }

  renderAndPlaceObject(atlas, sprite, grid, x, y, xOffset, yOffset, scaleX, scaleY, level) {
        let object = level.game.add.sprite(0, 0, atlas, sprite)

        object.alpha = 0
        grid.placeObject(x, y, object, xOffset, yOffset, scaleX, scaleY)

        object.alpha = 1
        this.placeObject(x,y,object,xOffset,yOffset,scaleX,scaleY)
        return object
    }
    placeObject(x, y, obj, offsetX, offsetY, scaleX, scaleY) {

        //Calculate target coordinates
        let converted = this.convert(x + offsetX, y + offsetY)
        obj.x = converted.x;
        obj.y = converted.y;

        obj.scale.setTo(this.scaleRatio * scaleX, this.scaleRatio * scaleY)
        obj.i = x;
        obj.j = y;
        //Update on array
        this.objectArray[x][y] = obj
    }
    //using callback directly doesnt work for some reason
    callbackWrapper() {
        if(this.error =="obstruction_error"){
          this.error = false
          this.callback('obstruction_error')
        }
        else if (this.error =='outofbounds_error'){
          this.error = false
          this.callback('outofbounds_error')
        } else
            this.callback()
    }


    resetPosition(obj,coordinates,xOffset,yOffset,frameName) 
    {
        this.objectArray[obj.i][obj.j] = null
        obj.frameName = frameName
        obj.i = coordinates.x
        obj.j = coordinates.y
        let newCoordinates = this.convert(coordinates.x + xOffset,coordinates.y + yOffset)
        obj.x = newCoordinates.x
        obj.y = newCoordinates.y
        this.objectArray[obj.i][obj.j] = obj
    }
    //Moves j boxes to the right and i up  call callback when tween is done so next command can be processed 
    moveObject(x, y, obj, callbackToAsync, fade, offsetX = 0, offsetY = 0, override = false) {
        this.error =false;
        this.objectArray[obj.i][obj.j] = null
        let obstruction = this.checkObstruction( { 'x': obj.i, 'y': obj.j }, {'x':obj.i +x,'y':obj.j +y}) 
        let outOfBounds = this.checkOutOfBounds({'x':obj.i + x,'y':obj.j+y})
        let newCoordinates= this.convert(obj.i + x + offsetX,obj.j+ y + offsetY)

        //if theres an obstruction it will stop at obstruction, if there is no obstruction it will stop when outta bounds otherwise it will go to new coordinates
        if (obstruction!= false) { 
            newCoordinates = this.convert(obstruction.x +offsetX,obstruction.y + offsetY)
            obj.i =obstruction.x
            obj.y =obstruction.y

            this.error = "obstruction_error" 
         }else if(outOfBounds != false && override ==false ) {
            newCoordinates = this.convert(outOfBounds.x +offsetX,outOfBounds.y + offsetY)
            obj.i =outOfBounds.x
            obj.y =outOfBounds.y
            this.error ="outofbounds_error"
         } else{ //no errors
            obj.i = obj.i + x
            obj.j = obj.j + y
          }

        if (!override)
          this.objectArray[obj.i][obj.j] = obj
        

        //start tween
        let tween = this.createTween(fade, obj, newCoordinates, Math.max(Math.abs(x), Math.abs(y)) * 600)
        this.callback = callbackToAsync
        tween.onComplete.add(this.callbackWrapper, this)

        tween.start()


    }
    checkOutOfBounds(endCoordinates) {
        if(endCoordinates.x >= this.tileArray.length) 
          return ({'x':this.tileArray.length-1,'y':endCoordinates.y})


        if (endCoordinates.x <0) 
            return ({'x':0,'y':endCoordinates.y})
            
        
        if (endCoordinates.y >= this.tileArray[endCoordinates.x].length)
          return ({'x':endCoordinates.x,'y':this.tileArray[endCoordinates.x].length-1})


        if(endCoordinates.y < 0)
           return ({'x':endCoordinates.x,'y':0})

        return false
     }

    checkObstructionForward(startCoordinates,endCoordinates,direction) {
        if (direction=='x') {
          for (var x = startCoordinates.x+1; x <= endCoordinates.x; x++) {
              if ((x < this.objectArray.length) && ((this.objectArray[x][startCoordinates.y] != null &&  this.objectArray[x][startCoordinates.y].key !='rickshaw') || this.tileArray[x][startCoordinates.y] =='nehar-lower' )) {
                  return { 'x': x-1, 'y': startCoordinates.y }
              }
          }
        }
        else {
           for (var y = startCoordinates.y+1; x <= endCoordinates.y; y++) {
              if ((y < this.objectArray[startCoordinates.x].length) && ((this.objectArray[startCoordinates.x][y] != null &&  this.objectArray[startCoordinates.x][y].key !='rickshaw' ) || this.tileArray[x][startCoordinates.y] =='nehar-lower')) {
                  return { 'x': startCoordinates.x, 'y': y -1}
              }
          }
        }
        return false
    }

    checkObstructionBackwards(startCoordinates,endCoordinates,direction) {
        if (direction=='x') {

          for (var x = startCoordinates.x-1; x >= endCoordinates.x; x--) {
              if ((x >= 0)  && ((this.objectArray[x][startCoordinates.y] != null && this.objectArray[x][startCoordinates.y].key !='rickshaw') || this.tileArray[x][startCoordinates.y]=='nehar-lower' ) ){
                  return { 'x': x+1, 'y': startCoordinates.y }
              }
          }
        }else {
          for (var y = startCoordinates.y-1; y >= endCoordinates.y; y--) {
              if ((y >=0) &&  ((this.objectArray[startCoordinates.x][y] != null &&  this.objectArray[startCoordinates.x][y].key !='rickshaw' )|| this.tileArray[startCoordinates.x][y]=='nehar-lower' )) {
                  return { 'x': startCoordinates.x, 'y': y+1 }
              }
          }
        }
        return false
    }
    //should check for obstruction and wateer 
    checkObstruction(startCoordinates, endCoordinates) {
        if (startCoordinates.x != endCoordinates.x) //moves in x
        {
            if (startCoordinates.x < endCoordinates.x)
                return this.checkObstructionForward(startCoordinates,endCoordinates,'x')
            else if (startCoordinates.x > endCoordinates.x)
                return this.checkObstructionBackwards(startCoordinates,endCoordinates,'x')
        } else if (startCoordinates.y != endCoordinates.y) //moves in y
        {
            if (startCoordinates.y < endCoordinates.y) 
                return this.checkObstructionForward(startCoordinates,endCoordinates,'y')
            else if (startCoordinates.y > endCoordinates.y) 
                return this.checkObstructionBackwards(startCoordinates,endCoordinates,'y')
        }

    }


}